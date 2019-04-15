import PropertySensor from "./helpers/propertySensor";
import { SensorState } from "../../common/SensorDuckInterface";

interface Data {
  location: {
    lat: number;
    lon: number;
  };
}

const initialState = {
  location: {
    lat: 0,
    lon: 0
  }
};

function transformData(position) {
  return {
    location: {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  };
}

class Geolocation extends PropertySensor<Data> {
  constructor() {
    super("geolocation", navigator.geolocation, initialState);
  }
  subscribe() {
    return async (dispatch, getState) => {
      await dispatch(this.unsubscribe());
      const watchId = navigator.geolocation.watchPosition(
        position => {
          dispatch(this._updateData(position));
        },
        error => {
          console.log("Error watching geolocation.");
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000
        }
      );
      dispatch(this._subscribe(watchId));
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      if (
        getState()[this.sensorName] &&
        getState()[this.sensorName].subscription
      ) {
        navigator.geolocation.clearWatch(
          getState()[this.sensorName].subscription
        );
      }
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
