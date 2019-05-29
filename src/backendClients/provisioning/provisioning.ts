import { getDPS, createDevice, Template } from "../../httpClients/IoTCentral";
import { getPrimaryConnectionString } from "./keyManagement";
import {
  RN_BACKEND_API,
  RN_MOBILE_DEVICE_TEMPLATE_ID,
  RN_MOBILE_DEVICE_TEMPLATE_VERSION
} from "react-native-dotenv";
import { logInfo } from "../../common/logger";

export async function provisionAndConnect(deviceParameters: {
  appId: string;
  deviceName: string;
  deviceTemplate: Template;
}) {
  const { appId, deviceName, deviceTemplate } = deviceParameters;
  logInfo("Provisioning Device...");
  const device = await _provisionThisDevice(deviceParameters);
  logInfo("Device Provisioned.", device);

  logInfo("Connecting Device....");
  const result = await connectDevice(device.deviceId, appId);
  logInfo("Device Connected");
  return result;
}

async function _provisionThisDevice(deviceParameters) {
  const { appId, deviceName, deviceTemplate } = deviceParameters;
  return createDevice(appId, deviceName, deviceTemplate);
}

export async function connectDevice(deviceId, appId) {
  const dps = await getDPS(appId);
  return _connectDevice(deviceId, dps, appId);
}

async function _connectDevice(deviceId, dps, appId) {
  const appKey = getPrimaryConnectionString(dps);
  const params = {
    deviceId,
    scopeId: dps.idScope,
    appKey,
    appId
  };
  return fetch(RN_BACKEND_API + "api/device/connect", {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });
}

export async function connectDeviceFirst(appId, deviceId) {
  const dps = await getDPS(appId);
  return _connectDeviceFirst(dps, appId, deviceId);
}

async function _connectDeviceFirst(dps, appId, deviceId) {
  const appKey = getPrimaryConnectionString(dps);
  const params = {
    scopeId: dps.idScope,
    appKey,
    appId,
    deviceId,
    templateId: RN_MOBILE_DEVICE_TEMPLATE_ID,
    templateVersion: RN_MOBILE_DEVICE_TEMPLATE_VERSION
  };
  return fetch(RN_BACKEND_API + "api/device/connect/deviceFirst", {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });
}

export async function disconnectDevice() {
  return fetch(RN_BACKEND_API + "api/device/disconnect", {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}
