import dpsKeyGen from "dps-keygen/dps";
import { connectDevice } from "../store/devices/actions";
import { AppState, getStore } from "../store/index";
const clientFromConnectionString = require("azure-iot-device-mqtt")
  .clientFromConnectionString;
const rnBridge = require("rn-bridge");

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
        console.log("Callback");

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

  /*
  twin.on("message", msg => {
    console.log("MESSAGE RECEIVED");
    console.log(JSON.stringify(msg));

    rnBridge.channel.post("/device/property/desired", {
      deviceId,
      msg
    });
  });*/
}

export async function connect(appSymmetricKey, deviceId, scopeId) {
  console.log(`appSymm ${appSymmetricKey} devId ${deviceId} scope ${scopeId}`);

  const connectionString = await _computeConnectionString(
    appSymmetricKey,
    deviceId,
    scopeId
  );
  console.log("Connecting...");
  const client = clientFromConnectionString(connectionString);
  const twin = await _getTwin(client);
  console.log("Got Twin.");
  console.log(`${twin.properties}`);
  _listenForSettingsUpdate(deviceId, twin);
  _listenForCommands(deviceId, client);
  getStore().dispatch(connectDevice(deviceId, client, twin));
  // console.log(twin);
  return { deviceId, properties: twin.properties };
}

function _getAllTwins() {
  const state: AppState = getStore().getState();
  const twins: any[] = [];
  for (const key in state.devices) {
    const twin = getStore().getState().devices[key].twin;
    twins.push(twin);
  }
  return twins;
}

export async function updateProperties(properties) {
  console.log("Updating Properties...");
  console.log(`${properties}`);
  console.log(`${JSON.stringify(properties)}`);
  const twins = _getAllTwins();
  twins.map(twin => {
    _updateProperties(twin, properties);
  });
}

export async function updateSettingComplete(setting, desiredChange) {
  console.log("Updating Setting Complete...");
  console.log(`${setting}`);
  console.log(`${JSON.stringify(setting)}`);
  const twins = _getAllTwins();
  twins.map(twin => {
    _updateSettingComplete(twin, setting, desiredChange);
  });
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
