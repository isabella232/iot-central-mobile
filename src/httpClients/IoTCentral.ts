import AuthManager from "../auth/AdalManager";
import { IOTC_API } from "react-native-dotenv";

export async function getApps() {
  return (await makeRequest("applications/")).value;
}

export async function getDevices(appId) {
  return (await makeRequest(`applications/${appId}/devices/`)).value;
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

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
