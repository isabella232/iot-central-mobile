import { makeRequest } from "../helpers/backendRequest";

export function updateTelemetry(telemetry) {
  return makeRequest("api/telemetry", "POST", telemetry);
}

export function getState() {
  return makeRequest("");
}
