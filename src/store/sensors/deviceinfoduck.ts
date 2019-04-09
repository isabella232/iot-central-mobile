import DeviceInfo from "react-native-device-info";
import { postProperties } from "../properties/reportedduck";

export const UPDATE = "aziot/deviceInfo/UPDATE";
export const SUBSCRIBE = "aziot/deviceInfo/SUBSCRIBE";
export const UNSUBSCRIBE = "aziot/deviceInfo/UNSUBSCRIBE";

const initialState = {
  subscription: null,
  data: {
    locale: "",
    id: "",
    ip: "",
    manufacturer: "",
    diskAvailable: 0
  }
};

// TODO: Extract all sensors to single "duckBuilder"
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE:
      return { ...state, subscription: action.subscription };
    case UNSUBSCRIBE:
      return { ...state, subscription: null };
    case UPDATE:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

function _updateDeviceInfo(data) {
  return { type: UPDATE, data };
}

function _subscribe(subscription) {
  return { type: SUBSCRIBE, subscription };
}

function _unsubscribe() {
  return { type: UNSUBSCRIBE };
}

async function _getData() {
  const id = DeviceInfo.getDeviceId();
  const ip = await DeviceInfo.getIPAddress();
  const locale = DeviceInfo.getDeviceLocale();
  const manufacturer = DeviceInfo.getManufacturer();
  const diskAvailable = DeviceInfo.getFreeDiskStorage();
  const battery = (await DeviceInfo.getBatteryLevel()) * 100;
  const data = { id, ip, locale, manufacturer, diskAvailable, battery };
  return data;
}

export function subscribe() {
  return async (dispatch, getState) => {
    if (
      !getState().sensors.deviceInfo.subscription &&
      !(await DeviceInfo.isEmulator())
    ) {
      const subscription = setInterval(async () => {
        const data = await _getData();
        dispatch(_updateDeviceInfo(data));
        dispatch(postProperties(data));
      }, 60000);
      dispatch(_subscribe(subscription));
    }
  };
}

export function unsubscribe() {
  return async (dispatch, getState) => {
    const subscription = getState().sensors.deviceInfo.subscription;
    if (subscription) {
      clearInterval(subscription);
      dispatch(_unsubscribe());
    }
  };
}
