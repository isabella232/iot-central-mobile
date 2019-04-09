import AuthManager from "../../auth/AdalManager";
import { getApps } from "../../httpClients/IoTCentral";

// reference: https://github.com/erikras/ducks-modular-redux
// Actions
const GET_APPLICATIONS = "aziot/applications/GET";
const GET_APPLICATIONS_SUCCESS = "aziot/applications/GET_SUCCESS";
const GET_APPLICATIONS_FAIL = "aziot/applications/GET_FAIL";

const initialState = {
  list: [],
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATIONS:
      return { ...state, isLoading: true };
    case GET_APPLICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.applications
      };
    case GET_APPLICATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "Error while fetching applications."
      };
    default:
      return state;
  }
}

function getApplications(token) {
  return {
    type: GET_APPLICATIONS,
    payload: {
      client: "iotcentral",
      request: {
        url: "/applications"
      },
      headers: {
        Authorization: "Bearer " + token
      }
    }
  };
}

function requestApplications() {
  return {
    type: GET_APPLICATIONS
  };
}
function receiveApplications(applications) {
  return {
    type: GET_APPLICATIONS_SUCCESS,
    applications
  };
}

export function fetchApplications() {
  return dispatch => {
    // TODO: Add token management
    dispatch(requestApplications());
    return getApps().then(result => {
      dispatch(receiveApplications(result));
    });
    /*
    return AuthManager.getToken().then(credentials => {
      dispatch(getApplications(credentials.accessToken));
    });*/
  };
}
