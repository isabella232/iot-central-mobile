// @ts-ignore
import { sendDeviceState } from "../state";
import DeviceBrightness from "react-native-device-brightness";
import { updateSetting } from "../settings";
// action types
export const UPDATE = "aziot/brightness/UPDATE";

const initialState = {
  value: 0.5
};
DeviceBrightness.getBrightnessLevel().then(
  value => (initialState.value = value)
);
// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return { ...state, value: action.value };

    default:
      return state;
  }
}

export function setBrightness(value: number) {
  return async (dispatch, getState) => {
    await DeviceBrightness.setBrightnessLevel(value / 100);

    await dispatch(updateSetting("brightness", value));
    dispatch(_setBrightness(value));
  };
}

function _setBrightness(value: number) {
  return { type: UPDATE, value };
}
