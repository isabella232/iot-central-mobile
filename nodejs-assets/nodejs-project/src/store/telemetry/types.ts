// action types
export const UPDATE_TELEMETRY = "UPDATE_TELEMETRY";

// state
export interface Telemetry {
  [id: string]: string;
}

// acitons
export interface UpdateTelemetryAction {
  type: typeof UPDATE_TELEMETRY;
  telemetry: Telemetry;
}

export type TelemetryActionTypes = UpdateTelemetryAction;
