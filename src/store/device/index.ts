import {
  provisionAndConnect,
  connectDevice as postConnectDevice
} from "../../backendClients/provisioning/provisioning";
import { postProperties } from "../properties/reportedduck";
import {
  MOBILE_DEVICE_TEMPLATE_ID,
  MOBILE_DEVICE_TEMPLATE_VERSION
} from "react-native-dotenv";
import DeviceInfo from "react-native-device-info";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { logError, logAppCenter } from "../../common/logger";
import { unsubscribeAll, subscribeAll } from "../sensors";

const CREATE_DEVICE = "aziot/devices/CREATE";
const CREATE_DEVICE_SUCCESS = "aziot/devices/CREATE_SUCCESS";
const CREATE_DEVICE_FAIL = "aziot/devices/CREATE_FAIL";

const CONNECT_DEVICE = "aziot/devices/CONNECT";
const CONNECT_DEVICE_SUCCESS = "aziot/devices/CONNECT_SUCCESS";
const CONNECT_DEVICE_FAIL = "aziot/devices/CONNECT_FAIL";

const MOBILE_TEMPLATE = {
  id: MOBILE_DEVICE_TEMPLATE_ID,
  version: MOBILE_DEVICE_TEMPLATE_VERSION
};

const persistConfig = {
  key: "device",
  storage: storage,
  blacklist: ["isLoading"]
};

const initialState = {
  deviceId: null,
  appId: null,
  isLoading: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_DEVICE:
      return { ...state, isLoading: true };
    case CONNECT_DEVICE_SUCCESS:
      return { ...state, isLoading: false };
    case CREATE_DEVICE:
      return { ...state, isLoading: true };
    case CREATE_DEVICE_SUCCESS:
      // todo: manage device list
      return {
        ...state,
        isLoading: false,
        appId: action.device.appId,
        deviceId: action.device.deviceId
      };
    case CREATE_DEVICE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error || "Error connecting device."
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, reducer);

function requestCreate() {
  return {
    type: CREATE_DEVICE
  };
}
function receiveDevice(device) {
  return {
    type: CREATE_DEVICE_SUCCESS,
    device
  };
}

function receiveConnectFail(error) {
  return {
    type: CREATE_DEVICE_FAIL,
    error
  };
}

export function createDevice(appId, deviceName?, deviceTemplate?) {
  return async dispatch => {
    await logAppCenter("Creating new device", { deviceName });
    dispatch(requestCreate());
    return dispatch(unsubscribeAll())
      .then(() =>
        provisionAndConnect({
          appId,
          deviceName: deviceName || DeviceInfo.getDeviceName(),
          deviceTemplate: deviceTemplate || MOBILE_TEMPLATE
        })
      )
      .then(result => result.json())
      .then(json => dispatch(receiveDevice({ ...json.device, appId })))
      .then(() => dispatch(subscribeAll()))
      .then(() => dispatch(postProperties()))
      .catch(err => {
        logError("Create Device Failure", err);
        dispatch(receiveConnectFail(err));
      });
  };
}

export function selectDevice(device) {
  return async dispatch => {
    dispatch(requestConnect());

    await dispatch(connectDevice(device)).then(() =>
      dispatch(receiveDevice(device))
    );
  };
}

export function connectExistingDevice() {
  return async (dispatch, getState) => {
    await dispatch(connectDevice({ ...getState().device }));
  };
}

function requestConnect() {
  return {
    type: CONNECT_DEVICE
  };
}

function connectDevice(device) {
  return async dispatch => {
    const { appId, deviceId } = device;
    dispatch({ type: CONNECT_DEVICE });
    await dispatch(unsubscribeAll())
      .then(() => postConnectDevice(deviceId, appId))
      .then(_ => dispatch({ type: CONNECT_DEVICE_SUCCESS }))
      .then(() => subscribeAll())
      .catch(error => {
        logError("Select Device Failure", error);
        dispatch(receiveConnectFail(error));
      });
  };
}
