import { Telemetry, UPDATE_TELEMETRY, UpdateTelemetryAction } from "./types";
// action creators
export function updateTelemetry(telemetry: Telemetry): UpdateTelemetryAction {
  return { type: UPDATE_TELEMETRY, telemetry };
}
