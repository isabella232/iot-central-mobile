import { Sensor, SensorState } from "./SensorDuckInterface";

export default class DefaultSensor<Data extends Object>
  implements Sensor<Data> {
  SUBSCRIBE: string;
  UNSUBSCRIBE: string;
  SEND_TO_CLOUD: string;
  SIMULATE: string;
  USE_LARGE_TILE: string;
  UPDATE: string;
  sensorName: string;
  sensor: any;
  initialState: SensorState<Data>;
  transform?: (Object) => Data;
  constructor(
    sensorName,
    sensor,
    initialDataState: Data,
    transform?: (Object) => Data
  ) {
    this.sensorName = sensorName;
    this.sensor = sensor;
    this.transform = transform;
    this.initialState = {
      largeTile: false,
      send: true,
      simulate: false,
      simulatedValue: initialDataState,
      subscription: null,
      data: initialDataState,
      interval: 5000
    };
    this.UPDATE = updateAction(sensorName);
    this.SUBSCRIBE = subscribeAction(sensorName);
    this.UNSUBSCRIBE = unsubscribeAction(sensorName);
    this.SEND_TO_CLOUD = sendToCloudAction(sensorName);
    this.SIMULATE = simulateAction(sensorName);
    this.USE_LARGE_TILE = useLargeTileAction(sensorName);
  }

  reducer = (
    state: SensorState<Data> | undefined,
    action
  ): SensorState<Data> => {
    state = state || this.initialState;
    switch (action.type) {
      case this.SEND_TO_CLOUD:
        return { ...state, send: action.send };
      case this.USE_LARGE_TILE:
        return { ...state, largeTile: action.use };
      case this.SIMULATE:
        return {
          ...state,
          simulate: action.simulate,
          simulatedValue: action.simulatedValue || state.simulatedValue
        };
      case this.SUBSCRIBE:
        return { ...state, subscription: action.subscription || true };
      case this.UNSUBSCRIBE:
        return { ...state, subscription: null };
      case this.UPDATE:
        const newData = this.transform
          ? this.transform(action.data)
          : action.data;
        return {
          ...state,
          data: { ...state.data, ...newData }
        };
      default:
        return state;
    }
  };
  subscribe() {
    return async (dispatch, getState) => {
      dispatch(this._subscribe());
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      dispatch(this._unsubscribe());
    };
  }

  sendToCloud(shouldSend: boolean) {
    return {
      type: this.SEND_TO_CLOUD,
      send: shouldSend
    };
  }

  simulate(shouldSimulate: boolean, data?: Data) {
    return {
      type: this.SIMULATE,
      simulate: shouldSimulate,
      simulatedValue: data
    };
  }

  useLargeTile(shouldUseLargeTile: boolean) {
    return {
      type: this.USE_LARGE_TILE,
      use: shouldUseLargeTile
    };
  }

  protected _subscribe(subscription?) {
    return {
      type: this.SUBSCRIBE,
      subscription
    };
  }

  protected _unsubscribe() {
    return {
      type: this.UNSUBSCRIBE
    };
  }

  protected _update(data) {
    return async (dispatch, getState) => {
      dispatch({
        type: this.UPDATE,
        data
      });
    };
  }
}

function subscribeAction(sensorName) {
  return `aziot/${sensorName}/SUBSCRIBE`;
}

function unsubscribeAction(sensorName) {
  return `aziot/${sensorName}/UNSUBSCRIBE`;
}

function updateAction(sensorName) {
  return `aziot/${sensorName}/UPDATE`;
}

function sendToCloudAction(sensorName) {
  return `aziot/${sensorName}/SEND`;
}

function simulateAction(sensorName) {
  return `aziot/${sensorName}/SIMULATE`;
}

function useLargeTileAction(sensorName) {
  return `aziot/${sensorName}/LARGE_TILE`;
}
