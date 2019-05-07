import backend from "nodejs-mobile-react-native";
import { getState as fetchState } from "../../backendClients/telemetry/telemetry";
import { connectExistingDevice } from "../device";
import { receiveSettings } from "../settings";
import { receiveCommand } from "../commands";
import { subscribeAll, unsubscribeAll } from "../sensors";
import { sendAllState } from "../state";
import { postProperties } from "../properties/reportedduck";

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
      await dispatch(connectExistingDevice());
      console.log("connected in FE");
      await dispatch(subscribeAll());
      await dispatch(sendAllState());
      console.log("posting props FE");
      await dispatch(postProperties());
    }
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
  return async (dispatch, getState) => {
    dispatch(_subscribe());
    dispatch(listenForCommands());
    dispatch(listenForSettings());
    backend.channel.addListener("/initialized", _ => {
      dispatch(initialized());
    });
    await fetchState().then(
      _ => {
        dispatch(initialized());
      },
      _ => {}
    );
  };
}

export function unsubscribe() {
  return async (dispatch, getState) => {
    await dispatch(unsubscribeAll());
  };
}
