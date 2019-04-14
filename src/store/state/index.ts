import { postTelemetry } from "../telemetry";
import mapping from "../settings/actionMapping";

// action types

export const UPDATE = "aziot/state/UPDATE";

const initialState = {
  flashlight: {
    value: "off"
  }
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      const currentState = state[action.stateName]
        ? state[action.stateName]
        : {};
      return {
        ...state,
        [action.stateName]: { ...currentState, value: action.value }
      };
    default:
      return state;
  }
}

export function sendDeviceState(stateName, value) {
  return async (dispatch, getState) => {
    dispatch(postTelemetry({ [stateName]: value }));
    dispatch(updateDeviceState(stateName, value));
  };
}

function updateDeviceState(stateName, value) {
  return { type: UPDATE, stateName, value };
}
