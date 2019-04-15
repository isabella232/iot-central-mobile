// @ts-ignore
import Torch from "react-native-torch";
import { sendDeviceState } from "../state";

// action types
export const UPDATE = "aziot/flashlight/UPDATE";

const initialState = {
  value: false
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return { ...state, value: action.value };

    default:
      return state;
  }
}

export function setFlashlight(value: boolean) {
  return async (dispatch, getState) => {
    console.log("in fl", value);
    await Torch.switchState(value);
    await dispatch(sendDeviceState("flashlight", value ? "on" : "off"));
    dispatch(_setFlashlight(value));
  };
}

function _setFlashlight(value: boolean) {
  return { type: UPDATE, value };
}
