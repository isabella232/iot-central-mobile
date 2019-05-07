import dpsKeyGen from "dps-keygen/dps";
const clientFromConnectionString = require("azure-iot-device-mqtt")
  .clientFromConnectionString;
const rnBridge = require("rn-bridge");
const Message = require("azure-iot-device").Message;

let _client;
let _twin;
let _deviceId;

function _computeConnectionString(
  appSymmetricKey: string,
  deviceId: string,
  scopeId: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    dpsKeyGen.getConnectionString(
      deviceId,
      appSymmetricKey,
      scopeId,
      null,
      true,
      (err, conStr) => {
        if (err) {
          reject(err);
        }
        resolve(conStr);
      }
    );
  });
}

function _getTwin(client): Promise<any> {
  return new Promise((resolve, reject) => {
    client.getTwin((err, twin) => {
      if (err) {
        reject(err);
      }
      resolve(twin);
    });
  });
}

function _listenForSettingsUpdate(deviceId, twin) {
  twin.on("properties.desired", desiredChange => {
    rnBridge.channel.post("/device/property/desired", {
      deviceId,
      desiredChange
    });
    // TODO: send 'received' update to server
  });
}

// TODO: map request id to response, send after front end success
// TODO: receive this from front end
const commands = [
  "turn_on_flashlight",
  "turn_off_flashlight",
  "alert",
  "play_music"
];

function _listenForCommands(deviceId, client) {
  console.log("Listening for commands...");
  commands.forEach(command => {
    client.onDeviceMethod(command, (request, response) => {
      console.log(`command received: ${command}`);
      rnBridge.channel.post("/command/received", {
        deviceId,
        command,
        payload: request.payload,
        requestId: request.requestId
      });
      response.send(200);
    });
  });
}

export async function connect(appSymmetricKey, deviceId, scopeId) {
  console.log(`appSymm ${appSymmetricKey} devId ${deviceId} scope ${scopeId}`);
  console.log("Connecting...");
  if (_deviceId === deviceId) {
    console.log("Already Connected!");

    return { deviceId, properties: _twin.properties };
  }
  try {
    const connectionString = await _computeConnectionString(
      appSymmetricKey,
      deviceId,
      scopeId
    );
    _client = clientFromConnectionString(connectionString);
    _twin = await _getTwin(_client);
    _deviceId = deviceId;
    _listenForSettingsUpdate(_deviceId, _twin);
    _listenForCommands(_deviceId, _client);
    // console.log(twin);
    return { deviceId, properties: _twin.properties };
  } catch (e) {
    console.log("Error connecting device.", e);
    _client = null;
    _twin = null;
    _deviceId = null;
    throw e;
  }
}

export async function updateProperties(properties) {
  if (!_client) {
    return;
  }
  try {
    await _updateProperties(_twin, properties);
  } catch (e) {
    console.log("Error Updating Properties", e);
    throw e;
  }
}

export async function updateSettingComplete(setting, desiredChange) {
  if (!_client) {
    return;
  }
  try {
    _updateSettingComplete(_twin, setting, desiredChange);
  } catch (e) {
    console.log("Error Updating Setting", e);
    throw e;
  }
}

async function _updateSettingComplete(twin, setting, desiredChange) {
  const patch = {
    [setting]: {
      value: desiredChange[setting].value,
      status: "completed",
      desiredVersion: desiredChange.$version
    }
  };
  twin.properties.reported.update(patch, err =>
    console.log(
      `Sent setting update for ${setting}; ` +
        (err ? `error: ${err.toString()}` : `status: success`)
    )
  );
}

function _updateProperties(twin, properties) {
  return new Promise((resolve, reject) => {
    if (!twin) {
      reject("Twin DNE");
    }
    twin.properties.reported.update(properties, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

export function sendTelemetry(telemetry) {
  if (!_client) {
    return;
  }
  try {
    const message = new Message(JSON.stringify(telemetry));
    return _sendEvent(_client, message);
  } catch (e) {
    console.log("Error Sending Telemetry", e);
    throw e;
  }
}

function _sendEvent(client, message) {
  return new Promise((resolve, reject) => {
    client.sendEvent(message, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
