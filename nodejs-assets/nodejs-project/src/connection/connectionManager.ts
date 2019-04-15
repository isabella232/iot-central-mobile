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
    return { deviceId, properties: _twin.properties };
  }
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
}

export async function updateProperties(properties) {
  if (!_client) {
    return;
  }
  console.log("Updating Properties...");
  console.log(`${properties}`);
  console.log(`${JSON.stringify(properties)}`);
  _updateProperties(_twin, properties);
}

export async function updateSettingComplete(setting, desiredChange) {
  if (!_client) {
    return;
  }
  console.log("Updating Setting Complete...");
  console.log(`${setting}`);
  console.log(`${JSON.stringify(setting)}`);
  _updateSettingComplete(_twin, setting, desiredChange);
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
    twin.properties.reported.update(properties, err => {
      if (err) {
        console.log("Error Updating Properties!!");

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
  const message = new Message(JSON.stringify(telemetry));
  return _sendEvent(_client, message);
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
