import { Geolocation } from "react-native";
import { updateProperties } from "../../backendClients/telemetry/properties";
import { logError, logInfo } from "../../common/logger";

const UPDATE_PROPERTIES = "aziot/properties/UPDATE";
const UPDATE_PROPERTIES_SUCCESS = "aziot/properties/UPDATE_SUCCESS";
const UPDATE_PROPERTIES_FAIL = "aziot/properties/UPDATE_FAIL";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROPERTIES:
      return {
        ...state,
        ...action.properties
      };
    case UPDATE_PROPERTIES_SUCCESS:
      return state; //{ ...state, isLoading: false };
    case UPDATE_PROPERTIES_FAIL:
      return state; //{ ...state, isLoading: false };
    default:
      return state;
  }
}

function _updateProperties(properties) {
  return {
    type: UPDATE_PROPERTIES,
    properties
  };
}

function _updatePropertiesComplete() {
  return {
    type: UPDATE_PROPERTIES_SUCCESS
  };
}

function _updatePropertiesFail() {
  return {
    type: UPDATE_PROPERTIES_FAIL
  };
}

export function postProperties(properties?) {
  return (dispatch, getState) => {
    const currentProperties = getState().properties.reported;
    /*
    if (properties) {
      const updatedProperties = getUpdatedProperties(
        currentProperties,
        properties
      );
      if (updatedProperties) {
        properties = updatedProperties;
      } else {
        return Promise.resolve();
      }
    }*/
    const postedProperties = properties || currentProperties;
    dispatch(_updateProperties(postedProperties));
    return updateProperties(postedProperties)
      .then(response => {
        dispatch(_updatePropertiesComplete());
      })
      .catch(e => {
        logError("Error updating properties.", e);
        dispatch(_updatePropertiesFail());
      });
  };
}

function getUpdatedProperties(oldProperties, newProperties) {
  let updatedProperties = {};
  Object.keys(newProperties).forEach((key, index) => {
    if (oldProperties[key] && oldProperties[key] !== newProperties[key]) {
      updateProperties[key] = newProperties[key];
    }
  });
  if (Object.keys(updatedProperties).length === 0) {
    return null;
  } else {
    return updatedProperties;
  }
}
