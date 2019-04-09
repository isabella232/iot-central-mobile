import { CONNECT_DEVICE, ConnectDeviceAction, Device } from "./types";

// action creators
export function connectDevice(deviceId: string, client, twin) {
  return { type: CONNECT_DEVICE, deviceId, client, twin };
}
