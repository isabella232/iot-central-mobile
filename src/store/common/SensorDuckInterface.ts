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
  SEND_TO_CLOUD: string;
  SIMULATE: string;
  USE_LARGE_TILE: string;
  reducer(state: SensorState<Data>, action: SensorActions);
  subscribe();
  unsubscribe();
  sendToCloud(shouldSend: boolean);
  simulate(shouldSimulate: boolean, data?: Data);
  useLargeTile(shouldUseLargeTile: boolean);
}

export interface SensorState<Data extends Object> {
  data: Data;
  send: boolean;
  simulate: boolean;
  simulatedValue: Data;
  largeTile: boolean;
  interval: number;
  subscription: any;
}
