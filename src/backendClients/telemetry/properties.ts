import { makeRequest } from "../helpers/backendRequest";
export function updateProperties(properties) {
  return makeRequest("api/device/property/reported", "POST", properties);
}
