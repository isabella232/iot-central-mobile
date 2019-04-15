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
import { dispatch } from "rxjs/internal/observable/range";

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

const initialState = {
  deviceId: null,
  appId: null,
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

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

export function createDevice(appId, deviceName?, deviceTemplate?) {
  return dispatch => {
    dispatch(requestCreate());
    return provisionAndConnect({
      appId,
      deviceName: deviceName || DeviceInfo.getDeviceName(),
      deviceTemplate: deviceTemplate || MOBILE_TEMPLATE
    })
      .then(result => result.json())
      .then(json => dispatch(receiveDevice({ ...json.device, appId })))
      .then(() => dispatch(postProperties()))
      .catch(err => {
        console.log("Error Creating Device.");
        console.log(err);
      });
  };
}

export function selectDevice(device) {
  return async dispatch => {
    dispatch(receiveDevice(device));
    await dispatch(connectDevice(device));
  };
}

export function connectExistingDevices() {
  return (dispatch, getState) => {
    dispatch(connectDevice({ ...getState().devices }));
  };
}

function connectDevice(device) {
  return async dispatch => {
    const { appId, deviceId } = device;
    dispatch({ type: CONNECT_DEVICE });
    await postConnectDevice(deviceId, appId).then(
      _ => dispatch({ type: CONNECT_DEVICE_SUCCESS }),
      _ => dispatch({ type: CONNECT_DEVICE_FAIL })
    );
  };
}
