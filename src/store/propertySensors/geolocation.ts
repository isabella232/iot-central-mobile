import PropertySensor from "./helpers/propertySensor";

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
    super("geolocation", navigator.geolocation, initialState, transformData);
  }
  subscribe() {
    return async (dispatch, getState) => {
      await dispatch(this.unsubscribe());
      const watchId = navigator.geolocation.watchPosition(
        position => {
          console.log("Updating Geolocation.");
          console.log(`${JSON.stringify(position)}`);
          dispatch(this._update(position));
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
