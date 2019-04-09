import { updateTelemetry as sendTelemetry } from "../../backendClients/telemetry/telemetry";

// action types
export const UPDATE_TELEMETRY = "aziot/telemetry/UPDATE";

export const SEND_TELEMETRY = "aziot/telemetry/SEND";
export const SEND_TELEMETRY_SUCCESS = "aziot/telemetry/SEND_SUCCESS";
export const SEND_TELEMETRY_FAIL = "aziot/telemetry/SEND_FAIL";

const SUBSCRIBE_TELEMETRY = "aziot/telemetry/SUBSCRIBE";
const UNSUBSCRIBE_TELEMETRY = "aziot/telemetry/SUBSCRIBE";

const initialState = {
  isLoading: false,
  data: {},
  subscription: null,
  history: []
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TELEMETRY:
      const telemetry = action.data;
      return { ...state, data: { ...state.data, ...telemetry } };
    case SEND_TELEMETRY:
      const history = state.history
        ? state.history.concat(action.telemetry)
        : [action.telemetry];
      if (history.length > 60) {
        history.shift();
      }
      return { ...state, isLoading: true, history };
    case SEND_TELEMETRY_SUCCESS:
      return { ...state, isLoading: false };
    case SEND_TELEMETRY_FAIL:
      return { ...state, isLoading: false };
    case SUBSCRIBE_TELEMETRY:
      return { ...state, subscription: action.subscription };
    case UNSUBSCRIBE_TELEMETRY:
      return { ...state, subscription: undefined };
    default:
      return state;
  }
}

export function _postingTelemetry(telemetry) {
  return { type: SEND_TELEMETRY, telemetry };
}

export function _postingTelemetrySuccess() {
  return { type: SEND_TELEMETRY_SUCCESS };
}
// action creators
export function updateTelemetry(data) {
  return { type: UPDATE_TELEMETRY, data };
}

function _subscribeTelemetry(subscription) {
  return { type: SUBSCRIBE_TELEMETRY, subscription };
}

function _unsubscribeTelemetry() {
  return {
    type: UNSUBSCRIBE_TELEMETRY
  };
}

function gatherTelemetry(state) {
  let telemetry = {
    ...state.accelerometer.data,
    ...state.pedometer.data,
    ...state.gyroscope.data,
    ...state.magnetometer.data,
    ...state.controls.slider.data
  };
  return telemetry;
}

export function postTelemetryOnInterval() {
  return async (dispatch, getState) => {
    dispatch(stopSendingTelemetry());
    const subscription = setInterval(async () => {
      const telemetry = gatherTelemetry(getState());
      dispatch(_postingTelemetry(telemetry));
      await sendTelemetry(telemetry);
      dispatch(_postingTelemetrySuccess());
    }, 10000);
    dispatch(_subscribeTelemetry(subscription));
  };
}

export function stopSendingTelemetry() {
  return (dispatch, getState) => {
    if (getState().telemetry.subscription) {
      clearInterval(getState().telemetry.subscription);
      dispatch(_unsubscribeTelemetry());
    }
  };
}
