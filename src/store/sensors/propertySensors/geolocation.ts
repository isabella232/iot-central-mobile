import PropertySensor from "./helpers/propertySensor";
import { SensorState } from "../common/SensorDuckInterface";
import { postTelemetry } from "../../telemetry";
import { postProperties } from "../../properties/reportedduck";
// @ts-ignore
import requestLocationPermissions from "./helpers/requestGeolocationPermission";
import { logInfo, logError } from "../../../common/logger";

interface Data {
  location: {
    lat: number;
    lon: number;
  };
}

const initialState = {
  coords: {
    altitude: 0,
    altitudeAccuracy: 1,
    latitude: 0,
    accuracy: 1,
    longitude: 0,
    heading: 0,
    speed: 0
  },
  timestamp: 0
};

function transformData(position) {
  return {
    location: {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  };
}

class Geolocation extends PropertySensor<GeolocationData> {
  constructor() {
    super("geolocation", navigator.geolocation, initialState);
  }
  subscribe() {
    return async (dispatch, getState) => {
      const allowed = await requestLocationPermissions();
      if (!allowed) {
        logInfo("Geolocation: Permission Denied");
        return;
      }
      navigator.geolocation.getCurrentPosition(async position => {
        dispatch(this.updateData(position));
        await dispatch(postProperties(transformData(position)));
      });
      const geolocationSubscription = navigator.geolocation.watchPosition(
        async position => {
          dispatch(this.updateData(position));
          await dispatch(postProperties(transformData(position)));
        },
        error => {
          logError("Error watching geolocation", error);
        },
        {
          enableHighAccuracy: true,
          // TODO: this would be the equivalent of "send frequency"
          maximumAge: 100000
        }
      );
      dispatch(this._subscribe(geolocationSubscription));
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      const sensorState = getState().geolocation;
      navigator.geolocation.clearWatch(sensorState.sensorSubscription);
      dispatch(this._unsubscribe());
    };
  }
}

export default new Geolocation();

export interface GeolocationData {
  coords: {
    altitude: number;
    altitudeAccuracy: number;
    latitude: number;
    accuracy: number;
    longitude: number;
    heading: number;
    speed: number;
  };
  timestamp: number;
}

export interface GeolocationState extends SensorState<GeolocationData> {}
