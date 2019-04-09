import { AppState, getStore } from "../store/index";
const Message = require("azure-iot-device").Message;

export function sendTelemetry(telemetry) {
  const state: AppState = getStore().getState();
  const message = new Message(JSON.stringify(telemetry));
  // tslint:disable-next-line: forin
  for (const key in state.devices) {
    state.devices[key].client.sendEvent(message, (err, res) => {
      /*console.log(
        `Sent message: ${message.getData()}` +
          (err ? `; error: ${err.toString()}` : "") +
          (res ? `; status: ${res.constructor.name}` : "")
      );*/
    });
  }
}
