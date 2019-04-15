import PropertySensor from "./helpers/propertySensor";
import DeviceInformation from "react-native-device-info";

const initialDataState = {
  locale: "",
  id: "",
  ip: "",
  manufacturer: "",
  diskAvailable: 0,
  battery: 0
};

interface Data {
  locale: string;
  id: string;
  ip: string;
  manufacturer: string;
  diskAvailable: number;
  battery: number;
}

class DeviceInfo extends PropertySensor<Data> {
  constructor() {
    super("deviceInfo", DeviceInformation, initialDataState);
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
