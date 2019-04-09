"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../store/index");
var Message = require("azure-iot-device").Message;
function sendTelemetry(telemetry) {
    var state = index_1.getStore().getState();
    var message = new Message(JSON.stringify(telemetry));
    // tslint:disable-next-line: forin
    for (var key in state.devices) {
        state.devices[key].client.sendEvent(message, function (err, res) {
            /*console.log(
              `Sent message: ${message.getData()}` +
                (err ? `; error: ${err.toString()}` : "") +
                (res ? `; status: ${res.constructor.name}` : "")
            );*/
        });
    }
}
exports.sendTelemetry = sendTelemetry;
