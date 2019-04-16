import { Sensor, SensorState } from "./SensorDuckInterface";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export default class DefaultSensor<Data extends Object>
  implements Sensor<Data> {
  SUBSCRIBE: string;
  UNSUBSCRIBE: string;
  UPDATE_DATA: string;
  UPDATE_SEND: string;
  UPDATE_SEND_FREQUENCY: string;
  UPDATE_SIMULATE: string;
  UPDATE_SIMULATED_VALUE: string;
  UPDATE_USE_LARGE_TILE: string;
  sensorName: string;
  sensor: any;
  initialState: SensorState<Data>;
  sensorPersistConfig: any;
  constructor(sensorName, sensor, initialDataState: Data) {
    this.sensorName = sensorName;
    this.sensor = sensor;
    this.initialState = {
      data: initialDataState,
      shouldSend: true,
      shouldSimulate: false,
      simulatedValue: initialDataState,
      shouldUseLargeTile: false,
      sendInterval: 5000
    };
    this.sensorPersistConfig = {
      key: this.sensorName,
      storage: storage,
      blacklist: ["sensorSubscription", "telemetrySubscription"]
    };
    this.reducer = persistReducer(this.sensorPersistConfig, this._reducer);
    this.SUBSCRIBE = subscribeAction(sensorName);
    this.UNSUBSCRIBE = unsubscribeAction(sensorName);
    this.UPDATE_DATA = updateDataAction(sensorName);
    this.UPDATE_SEND = updateSendAction(sensorName);
    this.UPDATE_SEND_FREQUENCY = updateSendFrequencyAction(sensorName);
    this.UPDATE_SIMULATE = updateSimulateAction(sensorName);
    this.UPDATE_SIMULATED_VALUE = updateSimulatedValueAction(sensorName);
    this.UPDATE_USE_LARGE_TILE = updateUseLargeTileAction(sensorName);
  }
  reducer;
  _reducer = (
    state: SensorState<Data> | undefined,
    action
  ): SensorState<Data> => {
    state = state || this.initialState;
    switch (action.type) {
      case this.UPDATE_SEND:
        return { ...state, shouldSend: action.shouldSend };
      case this.UPDATE_SEND_FREQUENCY:
        return { ...state, sendInterval: action.sendInterval };
      case this.UPDATE_USE_LARGE_TILE:
        return { ...state, shouldUseLargeTile: action.shouldUseLargeTile };
      case this.UPDATE_SIMULATE:
        return {
          ...state,
          shouldSimulate: action.shouldSimulate
        };
      case this.UPDATE_SIMULATED_VALUE:
        return {
          ...state,
          simulatedValue: { ...state.simulatedValue, ...action.simulatedValue }
        };
      case this.SUBSCRIBE:
        return { ...state };
      case this.UNSUBSCRIBE:
        return { ...state };
      case this.UPDATE_DATA:
        return {
          ...state,
          data: { ...state.data, ...action.data }
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

  protected _subscribe(subscription?) {
    return {
      type: this.SUBSCRIBE,
      subscription
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      dispatch(this._unsubscribe());
    };
  }

  protected _unsubscribe() {
    return {
      type: this.UNSUBSCRIBE
    };
  }

  updateData(data: Data) {
    return async (dispatch, getState) => {
      dispatch(this._updateData(data));
    };
  }

  protected _updateData(data) {
    return {
      type: this.UPDATE_DATA,
      data
    };
  }

  updateSend(shouldSend: boolean) {
    return async (dispatch, getState) => {
      dispatch(this._updateSend(shouldSend));
    };
  }

  protected _updateSend(shouldSend) {
    return {
      type: this.UPDATE_SEND,
      shouldSend
    };
  }

  updateSendFrequency(sendInterval: number) {
    return async (dispatch, getState) => {
      dispatch(this._updateSendFrequency(sendInterval));
    };
  }

  protected _updateSendFrequency(sendInterval: number) {
    return {
      type: this.UPDATE_SEND_FREQUENCY,
      sendInterval
    };
  }

  updateUseLargeTile(shouldUseLargeTile: boolean) {
    return async (dispatch, getState) => {
      dispatch(this._updateUseLargeTile(shouldUseLargeTile));
    };
  }

  protected _updateUseLargeTile(shouldUseLargeTile: boolean) {
    return {
      type: this.UPDATE_USE_LARGE_TILE,
      shouldUseLargeTile
    };
  }

  updateSimulate(shouldSimulate: boolean) {
    return async (dispatch, getState) => {
      dispatch(this._updateSimulate(shouldSimulate));
    };
  }

  protected _updateSimulate(shouldSimulate: boolean) {
    return {
      type: this.UPDATE_SIMULATE,
      shouldSimulate
    };
  }

  updateSimulatedValue(simulatedValue: Data) {
    return async (dispatch, getState) => {
      dispatch(this._updateSimulatedValue(simulatedValue));
    };
  }

  protected _updateSimulatedValue(simulatedValue: Data) {
    return {
      type: this.UPDATE_SIMULATED_VALUE,
      simulatedValue
    };
  }
}

function subscribeAction(sensorName) {
  return `aziot/${sensorName}/SUBSCRIBE`;
}

function unsubscribeAction(sensorName) {
  return `aziot/${sensorName}/UNSUBSCRIBE`;
}

function updateDataAction(sensorName) {
  return `aziot/${sensorName}/UPDATE_DATA`;
}

function updateSendAction(sensorName) {
  return `aziot/${sensorName}/UPDATE_SEND`;
}
function updateSendFrequencyAction(sensorName) {
  return `aziot/${sensorName}/UPDATE_SEND_FREQUENCY`;
}
function updateSimulateAction(sensorName) {
  return `aziot/${sensorName}/UPDATE_SIMULATE`;
}
function updateSimulatedValueAction(sensorName) {
  return `aziot/${sensorName}/UPDATE_SIMULATED_VALUE`;
}
function updateUseLargeTileAction(sensorName) {
  return `aziot/${sensorName}/UPDATE_LARGE_TILE`;
}
