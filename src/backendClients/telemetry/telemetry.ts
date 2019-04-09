import { BACKEND_API } from "react-native-dotenv";

export function updateTelemetry(telemetry) {
  return fetch(BACKEND_API + "api/telemetry", {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(telemetry)
  });
}

export function getState() {
  return fetch(BACKEND_API, {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}
