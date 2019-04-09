"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
// action creators
function connectDevice(deviceId, client, twin) {
    return { type: types_1.CONNECT_DEVICE, deviceId: deviceId, client: client, twin: twin };
}
exports.connectDevice = connectDevice;
