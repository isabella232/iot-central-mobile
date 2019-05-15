import {
  getApps,
  Application,
  getDeviceTemplates
} from "../../httpClients/IoTCentral";
import {
  MOBILE_DEVICE_TEMPLATE_ID,
  MOBILE_DEVICE_TEMPLATE_VERSION
} from "react-native-dotenv";

// reference: https://github.com/erikras/ducks-modular-redux
// Actions
const GET_APPLICATIONS = "aziot/applications/GET";
const GET_APPLICATIONS_SUCCESS = "aziot/applications/GET_SUCCESS";
const GET_APPLICATIONS_FAIL = "aziot/applications/GET_FAIL";

const CLEAR = "aziot/applications/GET_FAIL";

const initialState = {
  list: [],
  isLoading: false,
  error: null
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
        error: action.error || "Error while fetching applications."
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

function receiveFailure(error) {
  return {
    type: GET_APPLICATIONS_FAIL,
    error
  };
}

function clearList() {
  return {
    type: GET_APPLICATIONS_SUCCESS,
    applications: []
  };
}

export function fetchApplications() {
  return dispatch => {
    // TODO: Add token management
    dispatch(requestApplications());
    return getApps()
      .then(async (applications: Array<Application>) => {
        // code for filtering applications
        // const appsWithTemplates = await Promise.all(
        //  applications.map(a => addTemplatesToApp(a))
        // );
        // const mobileApps = getMobileApps(appsWithTemplates);
        dispatch(receiveApplications(applications));
      })
      .catch(error => {
        dispatch(receiveFailure(error));
      });
  };
}

async function addTemplatesToApp(app: Application) {
  const templates = await getDeviceTemplates(app.id);
  return {
    ...app,
    templates
  };
}

function getMobileApps(appsWithTemplates) {
  return appsWithTemplates.filter(app => {
    const templates = app.templates;
    return templates.find(t => t.id === MOBILE_DEVICE_TEMPLATE_ID);
  });
}
