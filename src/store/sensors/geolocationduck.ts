import { postProperties } from "../properties/reportedduck";

export const SUBSCRIBE = "aziot/geolocation/SUBSCRIBE";
export const UNSUBSCRIBE = "aziot/geolocation/UNSUBSCRIBE";

export const UPDATE = "aziot/geolocation/UPDATE";

const initialState = {
  subscription: null,
  data: {
    location: {
      lat: 0,
      lon: 0
    }
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE:
      return { ...state, subscription: action.subscription };
    case UNSUBSCRIBE:
      return { ...state, subscription: null };
    case UPDATE:
      return action.position
        ? {
            ...state,
            data: {
              location: {
                lat: action.position.coords.latitude,
                lon: action.position.coords.longitude
              }
            }
          }
        : state;
    default:
      return state;
  }
}

function _watchGeolocation(watchId) {
  return {
    type: SUBSCRIBE,
    subscription: watchId
  };
}

function _unwatchGeolocation() {
  return {
    type: UNSUBSCRIBE
  };
}

function _updateGeolocation(position) {
  return {
    type: UPDATE,
    position
  };
}

export function subscribe() {
  return (dispatch, getState) => {
    const watchId = navigator.geolocation.watchPosition(
      position => {
        dispatch(_updateGeolocation(position));
        return dispatch(postProperties(getState().sensors.geolocation.data));
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
    dispatch(_watchGeolocation(watchId));
  };
}

export function unsubscribe() {
  return (dispatch, getState) => {
    if (getState().sensors.geolocation) {
      navigator.geolocation.clearWatch(
        getState().sensors.geolocation.subscription
      );
    }
    dispatch(_unwatchGeolocation());
  };
}
