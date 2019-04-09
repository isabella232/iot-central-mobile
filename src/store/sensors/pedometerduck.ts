import { updateTelemetry } from "../telemetry/telemetryduck";
import { Pedometer } from "expo-sensors";

export const UPDATE = "aziot/steps/UPDATE";
export const SUBSCRIBE = "aziot/steps/SUBSCRIBE";
export const UNSUBSCRIBE = "aziot/steps/UNSUBSCRIBE";

const initialState = {
  subscription: null,
  data: {
    steps: 0
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE:
      return { ...state, subscription: action.subscription };
    case UNSUBSCRIBE:
      return { ...state, subscription: null };
    case UPDATE:
      return {
        ...state,
        data: { ...state.data, ...action.data }
      };
    default:
      return state;
  }
}

function _update(data) {
  return { type: UPDATE, data };
}

function _subscribe(subscription) {
  return { type: SUBSCRIBE, subscription };
}

function _unsubscribe() {
  return { type: UNSUBSCRIBE };
}

async function _getData() {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const data = await Pedometer.getStepCountAsync(start, new Date());
  return data;
}

export function subscribe() {
  return async (dispatch, getState) => {
    if (
      !getState().sensors.pedometer.subscription &&
      (await Pedometer.isAvailableAsync())
    ) {
      const subscription = setInterval(async () => {
        const data = await _getData();
        dispatch(_update(data));
        dispatch(updateTelemetry(getState().sensors.pedometer.data));
      }, 5000);
      dispatch(_subscribe(subscription));
    }
  };
}

export function unsubscribe() {
  return (dispatch, getState) => {
    const subscription =
      getState().sensors.pedometer && getState().sensors.pedometer.subscription;
    if (subscription) {
      clearInterval(subscription);
      dispatch(_unsubscribe());
    }
  };
}
