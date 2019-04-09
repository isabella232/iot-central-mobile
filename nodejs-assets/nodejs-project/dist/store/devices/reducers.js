"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var clientFromConnectionString = require("azure-iot-device-mqtt")
    .clientFromConnectionString;
var intialState = {};
var defaultTelemetry = ["gyroscopeX", "gyroscopeY", "gyroscopeZ"];
function devices(state, action) {
    var _a;
    if (state === void 0) { state = intialState; }
    switch (action.type) {
        case types_1.CONNECT_DEVICE:
            if (state[action.deviceId]) {
                console.log("Device Already Connected.");
                return state;
            }
            return Object.assign({}, state, (_a = {},
                _a[action.deviceId] = {
                    client: action.client,
                    id: action.deviceId,
                    twin: action.twin
                },
                _a));
        default:
            return state;
    }
}
exports.devices = devices;
/*

function device(state: Device = {}, action: DeviceActionTypes): Device {
    switch (action.type) {
        case CONNECT_DEVICE:
        default:
        return state
    }
}*/
