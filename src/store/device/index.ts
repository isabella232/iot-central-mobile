import {
  provisionAndConnect,
  connectDevice as postConnectDevice,
  disconnectDevice as postDisconnectDevice,
  connectDeviceFirst as postConnectDeviceFirst
} from "../../backendClients/provisioning/provisioning";
import { postProperties } from "../properties/reportedduck";
import {
  deleteDevice as sendDeleteDevice,
  updateDeviceName,
  getDevice,
  getDevices
} from "../../httpClients/IoTCentral";
import {
  MOBILE_DEVICE_TEMPLATE_ID,
  MOBILE_DEVICE_TEMPLATE_VERSION
} from "react-native-dotenv";
import DeviceInfo from "react-native-device-info";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { logError, logAppCenter, logInfo } from "../../common/logger";
import { unsubscribeAll, subscribeAll } from "../sensors";
import { fetchDevices } from "../deviceList";
const uuidv4 = require("uuid/v4");

const CREATE_DEVICE = "aziot/devices/CREATE";
const CREATE_DEVICE_SUCCESS = "aziot/devices/CREATE_SUCCESS";
const CREATE_DEVICE_FAIL = "aziot/devices/CREATE_FAIL";

const CONNECT_DEVICE = "aziot/devices/CONNECT";
const CONNECT_DEVICE_SUCCESS = "aziot/devices/CONNECT_SUCCESS";
const CONNECT_DEVICE_FAIL = "aziot/devices/CONNECT_FAIL";

const DELETE = "aziot/devices/DELETE";
const DELETE_SUCCESS = "aziot/devices/DELETE_SUCCESS";
const DELETE_FAIL = "aziot/devices/DELETE_FAIL";

const DISCONNECT = "aziot/devices/DISCONNECT";
const DISCONNECT_SUCCESS = "aziot/devices/DISCONNECT_SUCCESS";
const DISCONNECT_FAIL = "aziot/devices/DISCONNECT_FAIL";

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
  isLoading: false,
  id: null
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
        deviceId: action.device.deviceId,
        id: action.device.id
      };
    case CREATE_DEVICE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error || "Error connecting device."
      };

    case DELETE:
      return { ...state, isLoading: true };

    case DELETE_SUCCESS:
      return { ...state, isLoading: false };

    case DELETE_FAIL:
      return { ...state, isLoading: false };

    case DISCONNECT:
      return { ...state, isLoading: true };

    case DISCONNECT_SUCCESS:
      return { ...state, appId: null, deviceId: null, isLoading: false };

    case DISCONNECT_FAIL:
      return { ...state, isLoading: false };

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

export function connectDeviceFirst(appId, deviceName) {
  return async dispatch => {
    dispatch(requestConnect());
    const deviceId = uuidv4();
    await dispatch(unsubscribeAll())
      .then(() => postConnectDeviceFirst(appId, deviceId))
      .then(() => getDevices(appId))
      .then(async (devices: Array<any>) => {
        const device = devices.find(d => d.deviceId === deviceId);
        await updateDeviceName(
          appId,
          device.id,
          deviceName || DeviceInfo.getDeviceName()
        );
        return dispatch(receiveDevice(device));
      })
      .then(() => dispatch(fetchDevices(appId)))
      .then(() => subscribeAll())
      .catch(error => {
        logError("Device First Connection Failure", error);
        dispatch(receiveConnectFail(error));
      });
  };
}

// Delete
function requestDelete(appId: string, deviceId: string) {
  return {
    type: DELETE,
    appId,
    deviceId
  };
}
function receiveDelete(appId, deviceId) {
  return {
    type: DELETE_SUCCESS
  };
}
function receiveDeleteFaiure(error) {
  return {
    type: DELETE_FAIL,
    error
  };
}

export function deleteDevice(appId: string, deviceId: string) {
  return async dispatch => {
    // TODO: Add token management
    await dispatch(disconnectDevice(appId, deviceId));
    dispatch(requestDelete(appId, deviceId));
    await sendDeleteDevice(appId, deviceId)
      .then(() => dispatch(fetchDevices(appId)))
      .then(result => {
        dispatch(receiveDelete(appId, deviceId));
      })
      .catch(error => {
        dispatch(receiveDeleteFaiure(error));
      });
  };
}

// Disconnect
function requestDisconnect() {
  return {
    type: DISCONNECT
  };
}
function receiveDisconnect() {
  return {
    type: DISCONNECT_SUCCESS
  };
}
function receiveDisconnectFaiure(error) {
  return {
    type: DISCONNECT_FAIL,
    error
  };
}

export function disconnectDevice(appId: string, deviceId: string) {
  return async (dispatch, getState) => {
    // TODO: Add token management
    if (
      getState().device.appId !== appId &&
      getState().device.deviceId !== deviceId
    ) {
      return Promise.resolve();
    }
    dispatch(requestDisconnect());
    await postDisconnectDevice()
      .then(result => {
        dispatch(receiveDisconnect());
      })
      .catch(error => {
        dispatch(receiveDisconnectFaiure(error));
      });
  };
}
