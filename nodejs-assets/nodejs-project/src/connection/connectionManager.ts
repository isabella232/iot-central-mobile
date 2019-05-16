import dpsKeyGen from "dps-keygen/dps";
const Mqtt = require("azure-iot-device-mqtt").Mqtt;

const rnBridge = require("rn-bridge");
import { Client, Message, Twin } from "azure-iot-device";
import { logAppCenter, logInfo } from "../logging/logger";

let _client: Client;
let _twin: Twin;
let _deviceId: string | null;

process.on("uncaughtException", err => {
  logInfo("UNCAUGHT EMITTER EXCEPTION", err);
});

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

function _getTwin(client: Client): Promise<any> {
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
  logInfo("Listening for commands...");
  commands.forEach(command => {
    client.onDeviceMethod(command, (request, response) => {
      logInfo(`command received: ${command}`);
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

async function closeClient(client: Client) {
  return new Promise((resolve, reject) => {
    client.close((err, result) => {
      if (err) {
        return reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function disconnect() {
  if (_twin) {
    _twin.removeAllListeners();
  }
  if (_client) {
    _client.removeAllListeners();
    closeClient(_client).catch(e => logInfo("Error closing client", e));
  }
  _deviceId = null;

  // @ts-ignore
  _client = null;
  // @ts-ignore
  _twin = null;
}

export async function connect(
  appSymmetricKey: string,
  deviceId: string,
  scopeId: string
) {
  logInfo(`appSymm ${appSymmetricKey} devId ${deviceId} scope ${scopeId}`);
  logInfo("Connecting...");
  if (_deviceId === deviceId) {
    logInfo("Already Connected!");

    return { deviceId, properties: _twin.properties };
  } else if (_deviceId) {
    try {
      logInfo("Disconnecting Existing Device...");
      await disconnect();
      logInfo("Device Disconnected");
    } catch (e) {
      logInfo("Error trying to close existing connection, continuing.");
    }
  }
  try {
    logInfo("Creating connection string...");

    const connectionString = await _computeConnectionString(
      appSymmetricKey,
      deviceId,
      scopeId
    );
    logInfo("Success.");

    logInfo("Getting client...");

    _client = Client.fromConnectionString(connectionString, Mqtt);
    logInfo("Success.");
    logInfo("Getting twin...");
    _twin = await _getTwin(_client);
    logInfo("Success.");

    _deviceId = deviceId;
    _listenForSettingsUpdate(_deviceId, _twin);
    _listenForCommands(_deviceId, _client);
    return { deviceId, properties: _twin.properties };
  } catch (e) {
    logAppCenter("Error Connecting Device", { Error: JSON.stringify(e) });
    logInfo("Error connecting device.", e);
    disconnect();
    throw e;
  }
}

export async function updateProperties(properties) {
  try {
    await _updateProperties(_twin, properties);
  } catch (e) {
    logInfo("Error Updating Properties", e);
    throw e;
  }
}

export async function updateSettingComplete(setting, desiredChange) {
  try {
    await _updateSettingComplete(_twin, setting, desiredChange);
  } catch (e) {
    logInfo("Error Updating Setting", e);
    throw e;
  }
}

async function _updateSettingComplete(twin: Twin, setting, desiredChange) {
  const patch = {
    [setting]: {
      value: desiredChange[setting].value,
      status: "completed",
      desiredVersion: desiredChange.$version
    }
  };
  return _updateProperties(twin, patch);
}

function _updateProperties(twin, properties) {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(reject, 5000, "Timeout");
  });
  const updatePromise = new Promise((resolve, reject) => {
    if (!twin || !twin.properties || !twin.properties.reported) {
      return resolve("Twin DNE");
    }
    twin.properties.reported.update(properties, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
  return Promise.race([timeoutPromise, updatePromise]).catch(e => {
    logInfo("Error updating properties error:", e);
  });
}
// UnauthorizedError || NotConnectedError
export function sendTelemetry(telemetry) {
  try {
    const message = new Message(JSON.stringify(telemetry));
    return _sendEvent(_client, message);
  } catch (e) {
    logInfo("Error Sending Telemetry", e);
    throw e;
  }
}

function _sendEvent(client, message) {
  return new Promise((resolve, reject) => {
    if (!client) {
      resolve({});
    }
    client.sendEvent(message, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}
