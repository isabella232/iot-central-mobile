import AuthManager from "../auth/AdalManager";
import { IOTC_API } from "react-native-dotenv";
import { Base64 } from "js-base64";
import { logInfo, logError } from "../common/logger";

export async function getApps() {
  return await makeRequest("applications/");
}

export async function getDevices(appId) {
  return await makeRequest(`applications/${appId}/devices/`);
}

export async function deleteDevice(appId, deviceId) {
  return await makeRequest(
    `applications/${appId}/devices/${deviceId}`,
    "DELETE"
  );
}

export async function getDeviceTemplates(appId) {
  const templates = await makeRequest(
    `/display/applications/${appId}/deviceTemplates/`
  );
  return templates.map(t => {
    const decoded = Base64.decode(t.id);
    return {
      fullId: decoded,
      id: decoded.split("/")[0],
      version: decoded.split("/")[1],
      name: t.name,
      display: t.id
    };
  });
}

export function createDevice(
  appId: string,
  deviceName: string,
  template: Template
) {
  const path = `applications/${appId}/devices?deviceTemplateDisplayId=${template.id +
    "/" +
    template.version}`;
  return makeRequest(path, "POST", {
    name: deviceName,
    deviceTemplate: template
  });
}

export async function updateDeviceName(
  appId: string,
  deviceId: string,
  name: string
) {
  const path = `applications/${appId}/devices/${deviceId}`;
  return makeRequest(path, "PATCH", {
    name
  });
}

export async function getDevice(appId: string, deviceId: string) {
  const path = `applications/${appId}/devices/${deviceId}`;
  return makeRequest(path);
}

export function getDPS(appId: string) {
  return makeRequest(`applications/${appId}/dps/`);
}

export interface Template {
  id: string;
  version: string;
}

export interface Application {
  name: string;
  id: string;
}

async function makeRequest(path, method = "GET", body?: {}) {
  const credentials = await AuthManager.getToken();
  try {
    const response = await fetch(IOTC_API + path, {
      method: method,
      headers: {
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + credentials.accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body && JSON.stringify(body)
    });

    const json = await response.json().catch(e => {
      //logInfo("Request RESULT: ", response);
      return {};
    });
    logInfo(json);
    return json.value || json;
  } catch (error) {
    logError("Error making request", error);
    throw error;
  }
}
