import backend from "nodejs-mobile-react-native";
import { getState as fetchState } from "../../backendClients/telemetry/telemetry";
import { connectExistingDevices } from "../devices/devicesduck";
import { subscribeAll } from "../sensors";
import { receiveSettings } from "../properties/desiredduck";
import { receiveCommand } from "../commands/commandsduck";

const SUBSCRIBE = "aziot/backend/SUBSCRIBE";
const INITIALIZED = "aziot/backend/INITIALIZED";
//const SETTING_RECEIVED = "aziot/backend/SETTING_RECEIVED";
//const COMMAND_RECEIVED = "aziot/backend/COMMAND_RECEIVED";

const initialState = {
  initialized: false,
  subscription: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE:
      return { ...state, subscription: true };
    case INITIALIZED:
      return { ...state, initialized: true };
    default:
      return state;
  }
}

function _initialized() {
  return { type: INITIALIZED };
}

function _subscribe() {
  return { type: SUBSCRIBE };
}

function initialized() {
  return async (dispatch, getState) => {
    if (!getState().backend.initialized) {
      dispatch(_initialized());
      await dispatch(connectExistingDevices());
    }

    await dispatch(subscribeAll());
  };
}

function listenForSettings() {
  return dispatch => {
    backend.channel.addListener("/device/property/desired", msg => {
      dispatch(receiveSettings(msg));
    });
  };
}

function listenForCommands() {
  return dispatch => {
    backend.channel.addListener("/command/received", msg => {
      dispatch(receiveCommand(msg.command));
    });
  };
}

export function subscribe() {
  return (dispatch, getState) => {
    dispatch(_subscribe());
    dispatch(listenForCommands());
    dispatch(listenForSettings());
    backend.channel.addListener("/initialized", _ => {
      dispatch(initialized());
    });
    fetchState().then(
      _ => {
        dispatch(initialized());
      },
      _ => {}
    );
  };
}
