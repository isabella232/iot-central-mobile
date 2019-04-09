import geolocation from "./geolocation";
import deviceInfo from "./deviceInfo";

export default {
  geolocation: geolocation.reducer,
  deviceInfo: deviceInfo.reducer
};

export const sensors = [geolocation, deviceInfo];
