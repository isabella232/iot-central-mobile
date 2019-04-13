import { postTelemetry } from "../telemetry";

// action types

export const UPDATE = "aziot/state/UPDATE";

const initialState = {
  information_button: {
    value: "This is the information message."
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

export function updateDeviceState(stateName, value) {
  return { type: UPDATE, stateName, value };
}
