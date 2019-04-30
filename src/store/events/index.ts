import { postTelemetry } from "../telemetry";

// action types
export const SEND = "aziot/event/SEND";
export const UPDATE = "aziot/event/UPDATE";

const initialState = {
  information_button: {
    value: "Information button pressed."
  },
  warning_button: {
    value: "Warning button pressed."
  },
  error_button: {
    value: "Error button pressed."
  }
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEND:
      return Object.assign({}, state, {
        [action.event.name]: {
          value: action.event.value,
          date: action.date
        }
      });

    case UPDATE:
      const currentState = state[action.event] ? state[action.event] : {};
      return {
        ...state,
        [action.event]: { ...currentState, value: action.value }
      };
    default:
      return state;
  }
}

export function sendEvent(event) {
  return async (dispatch, getState) => {
    await dispatch(postTelemetry({ [event.name]: event.value }));
    dispatch(_sendEventAction(event));
  };
}

export function updateEvent(event, value) {
  return { type: UPDATE, event, value };
}

function _sendEventAction(event) {
  return {
    type: SEND,
    event,
    date: Date.now()
  };
}
