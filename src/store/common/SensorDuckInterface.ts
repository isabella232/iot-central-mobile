export interface UpdateAction {
  type: string;
  data: Object;
}

export interface SubscribeAction {
  type: string;
}

export interface UnsubscribeAction {
  type: string;
}

export interface SendToCloudAction {
  type: string;
}
export interface StopSendToCloudAction {
  type: string;
}

export interface SimulateAction {
  type: string;
  data: Object;
}

export interface StopSimulateAction {
  type: string;
}

export interface UseLargeTileAction {
  type: string;
}

type SensorActions =
  | SubscribeAction
  | UnsubscribeAction
  | SendToCloudAction
  | StopSendToCloudAction
  | SimulateAction
  | StopSimulateAction;

export interface Sensor<Data extends Object> {
  SUBSCRIBE: string;
  UNSUBSCRIBE: string;
  UPDATE_DATA: string;
  UPDATE_SEND: string;
  UPDATE_SEND_FREQUENCY: string;
  UPDATE_SIMULATE: string;
  UPDATE_SIMULATED_VALUE: string;
  UPDATE_USE_LARGE_TILE: string;
  reducer(state: InternalSensorState<Data>, action: SensorActions);
  subscribe();
  unsubscribe();
  updateData(data: Data);
  updateSend(shouldSend: boolean);
  updateSendFrequency(sendInterval: number);
  updateUseLargeTile(shouldUseLargeTile: boolean);
  updateSimulate(shouldSimulate: boolean);
  updateSimulatedValue(simulatedValue: Data);
}

export interface SensorState<Data extends Object> {
  data: Data;
  shouldSend: boolean;
  shouldSimulate: boolean;
  simulatedValue: Data;
  shouldUseLargeTile: boolean;
  sendInterval: number;
}

export interface InternalSensorState<Data extends Object>
  extends SensorState<Data> {
  sensorSubscription?: any;
  telemetrySubscription?: any;
}
