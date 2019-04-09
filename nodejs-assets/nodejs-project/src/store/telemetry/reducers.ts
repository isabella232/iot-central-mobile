import { Telemetry, TelemetryActionTypes, UPDATE_TELEMETRY } from "./types";

// TODO: initialize telemetry
export function telemetry(state: Telemetry = {}, action: TelemetryActionTypes) {
  switch (action.type) {
    case UPDATE_TELEMETRY:
      return Object.assign({}, state, action.telemetry);
    default:
      return state;
  }
}
