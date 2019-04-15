import AuthManager from "../../auth/AdalManager";
import { getDevices } from "../../httpClients/IoTCentral";

// reference: https://github.com/erikras/ducks-modular-redux
// Actions
const GET = "aziot/devices/GET";
const GET_SUCCESS = "aziot/devices/GET_SUCCESS";
const GET_FAIL = "aziot/devices/GET_FAIL";

const initialState = {
  list: [],
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET:
      return { ...state, isLoading: true };
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
          : "Error while fetching applications."
      };
    default:
      return state;
  }
}

function request() {
  return {
    type: GET
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

export function fetchDevices(appId) {
  return dispatch => {
    // TODO: Add token management
    dispatch(request());
    return getDevices(appId)
      .then(result => {
        dispatch(receive(result));
      })
      .catch(error => {
        dispatch(receiveFaiure(error));
      });
    /*
    return AuthManager.getToken().then(credentials => {
      dispatch(getApplications(credentials.accessToken));
    });*/
  };
}
