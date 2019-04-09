// action types
export const CONNECT_DEVICE = "CONNECT_DEVICE";

// state
export interface Device {
  id: string;
  client: any;
}

export interface Devices {
  [id: string]: Device;
}

// actions
export interface ConnectDeviceAction {
  type: typeof CONNECT_DEVICE;
  deviceId: string;
  connectionString: string;
}

export type DeviceActionTypes = ConnectDeviceAction;
