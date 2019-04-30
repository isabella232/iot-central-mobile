import PropertySensor from "./helpers/propertySensor";
import DeviceInformation from "react-native-device-info";
import { SensorState } from "../common/SensorDuckInterface";
import DefaultSensor from "../common/defaultSensor";
import { postProperties } from "../../properties/reportedduck";
const initialDataState = {
  locale: "",
  id: "",
  ip: "",
  manufacturer: "",
  diskAvailable: 0,
  battery: 0
};

export interface DeviceInfoData {
  locale: string;
  id: string;
  ip: string;
  manufacturer: string;
  diskAvailable: number;
  battery: number;
}

export interface DeviceInfoState extends SensorState<DeviceInfoData> {}
class DeviceInfo extends DefaultSensor<DeviceInfoData> {
  constructor() {
    super("deviceInfo", DeviceInformation, initialDataState);
  }

  subscribe() {
    return async (dispatch, getState) => {
      // todo extract memory and battery as telemetry
      const data = await this._getData();
      dispatch(this.updateData(data));
      dispatch(postProperties(data));
      const subscription = setInterval(async () => {
        const data = await this._getData();
        dispatch(this.updateData(data));
        dispatch(postProperties(data));
      }, 5000);

      dispatch(this._subscribe(subscription));
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      const sensorState = getState()[this.sensorName];

      clearInterval(sensorState.sensorSubscription);
    };
  }

  async _getData() {
    const id = DeviceInformation.getDeviceId();
    const ip = await DeviceInformation.getIPAddress();
    const locale = DeviceInformation.getDeviceLocale();
    const manufacturer = DeviceInformation.getManufacturer();
    const diskAvailable = DeviceInformation.getFreeDiskStorage();
    const battery = (await DeviceInformation.getBatteryLevel()) * 100;
    const data = { id, ip, locale, manufacturer, diskAvailable, battery };
    return data;
  }

  async _isAvailable() {
    return !this.sensor.isEmulator();
  }
}

export default new DeviceInfo();
