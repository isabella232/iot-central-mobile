import { makeRequest } from "../helpers/backendRequest";

export function updateSettingsComplete(body) {
  return makeRequest("api/device/setting/update/complete", "POST", body);
}
