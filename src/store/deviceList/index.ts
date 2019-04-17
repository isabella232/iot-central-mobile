import AuthManager from "../../auth/AdalManager";
import { getDevices } from "../../httpClients/IoTCentral";

// reference: https://github.com/erikras/ducks-modular-redux
// Actions
const GET = "aziot/devices/GET";
const GET_SUCCESS = "aziot/devices/GET_SUCCESS";
const GET_FAIL = "aziot/devices/GET_FAIL";

const initialState = {
  appId: null,
  list: [],
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET:
      const list = state.appId === action.appId ? state.list : [];
      return { ...state, list, appId: action.appId, isLoading: true };
    case GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.devices
      };
    case GET_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
          ? action.error.message
          : "Error while fetching devices."
      };
    default:
      return state;
  }
}

function request(appId: string) {
  return {
    type: GET,
    appId
  };
}
function receive(devices) {
  return {
    type: GET_SUCCESS,
    devices
  };
}
function receiveFaiure(error) {
  return {
    type: GET_FAIL,
    error
  };
}

export function fetchDevices(appId: string) {
  return dispatch => {
    // TODO: Add token management
    dispatch(request(appId));
    return getDevices(appId)
      .then(result => {
        dispatch(receive(result));
      })
      .catch(error => {
        dispatch(receiveFaiure(error));
      });
  };
}
