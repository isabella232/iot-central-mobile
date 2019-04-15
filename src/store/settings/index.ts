import { Geolocation } from "react-native";
import { postProperties } from "../properties/reportedduck";
import { updateSettingsComplete as postUpdateComplete } from "../../backendClients/telemetry/settings";
import settingMapping from "./actionMapping";

const UPDATE_SETTINGS = "aziot/settings/UPDATE";
const UPDATE_SETTINGS_SUCCESS = "aziot/settings/UPDATE_SUCCESS";
const UPDATE_SETTINGS_FAIL = "aziot/settings/UPDATE_FAIL";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...action.setting
      };
    case UPDATE_SETTINGS_SUCCESS:
      return state; //{ ...state, isLoading: false };
    case UPDATE_SETTINGS_FAIL:
      return state; //{ ...state, isLoading: false };
    default:
      return state;
  }
}

function _updateSettings(setting) {
  return {
    type: UPDATE_SETTINGS,
    setting
  };
}
function handleSetting(settingName, settingValue) {
  return dispatch => {
    if (settingMapping[settingName]) {
      dispatch(settingMapping[settingName](settingValue));
    } else {
      const setting = { [settingName]: settingValue };
      dispatch(_updateSettings(setting));
    }
  };
}

function _updateSettingsComplete() {
  return {
    type: UPDATE_SETTINGS_SUCCESS
  };
}

export function updateSetting(settingName: string, value) {
  return dispatch => {
    const setting = { [settingName]: value };
    dispatch(_updateSettings(setting));
  };
}

export function receiveSettings(msg) {
  return async (dispatch, getState) => {
    const desiredChange = msg.desiredChange;
    for (let settingName in desiredChange) {
      await dispatch(
        handleSetting(settingName, desiredChange[settingName].value)
      );
      await postUpdateComplete({ setting: settingName, desiredChange });
    }
  };
}
