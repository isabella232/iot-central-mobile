import { CONNECT_DEVICE, Device, DeviceActionTypes, Devices } from "./types";
const clientFromConnectionString = require("azure-iot-device-mqtt")
  .clientFromConnectionString;

const intialState: Devices = {};
const defaultTelemetry = ["gyroscopeX", "gyroscopeY", "gyroscopeZ"];

export function devices(state = intialState, action) {
  switch (action.type) {
    case CONNECT_DEVICE:
      if (state[action.deviceId]) {
        console.log("Device Already Connected.");
        return state;
      }
      return Object.assign({}, state, {
        [action.deviceId]: {
          client: action.client,
          id: action.deviceId,
          twin: action.twin
        }
      });
    default:
      return state;
  }
}

/*

function device(state: Device = {}, action: DeviceActionTypes): Device {
    switch (action.type) {
        case CONNECT_DEVICE:
        default:
        return state
    }
}*/
