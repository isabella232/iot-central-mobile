import { updateTelemetry } from "../telemetry/telemetryduck";

export function subscribeAction(sensorName) {
  return `aziot/${sensorName}/SUBSCRIBE`;
}

export function unsubscribeAction(sensorName) {
  return `aziot/${sensorName}/UNSUBSCRIBE`;
}

export function updateAction(sensorName) {
  return `aziot/${sensorName}/UPDATE`;
}

export function buildReducer(sensorName, initialState) {
  const SUBSCRIBE = subscribeAction(sensorName);
  const UNSUBSCRIBE = unsubscribeAction(sensorName);
  const UPDATE = updateAction(sensorName);
  return (state = initialState, action) => {
    switch (action.type) {
      case SUBSCRIBE:
        return { ...state, subscription: true };
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
  };
}

export function buildSubscribe(sensorName, sensor, transform) {
  const SUBSCRIBE = subscribeAction(sensorName);
  const UNSUBSCRIBE = unsubscribeAction(sensorName);
  const UPDATE = updateAction(sensorName);
  function _watch() {
    return {
      type: SUBSCRIBE
    };
  }

  function _unwatch() {
    return {
      type: UNSUBSCRIBE
    };
  }

  function _update(data) {
    return {
      type: UPDATE,
      data
    };
  }

  return () => {
    return async (dispatch, getState) => {
      if (
        getState().sensors[sensorName] &&
        getState().sensors[sensorName].subscription &&
        (await sensor.isAvailableAsync())
      ) {
        return Promise.resolve();
      } else {
        if (await sensor.hasListeners()) {
          await sensor.removeAllListeners();
        }

        const subscription = await sensor.addListener(data => {
          dispatch(_update(data));
          dispatch(updateTelemetry(transform ? transform(data) : data));
        });
        dispatch(_watch());
        //sensor.setUpdateInterval(16);
      }
    };
  };
}

export function buildUnsubscribe(sensorName, sensor) {
  const UNSUBSCRIBE = unsubscribeAction(sensorName);
  function _unwatch() {
    return {
      type: UNSUBSCRIBE
    };
  }
  return () => {
    return async (dispatch, getState) => {
      if (await sensor.hasListeners()) {
        await sensor.removeAllListeners();
      }
      dispatch(_unwatch());
    };
  };
}
