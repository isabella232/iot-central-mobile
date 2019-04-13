import { updateSettingsComplete as postUpdateComplete } from "../../backendClients/telemetry/settings";
import executeCommand from "./executeCommand";

const EXECUTE = "aziot/commands/EXECUTE";
const EXECUTE_SUCCESS = "aziot/commands/EXECUTE_SUCCESS";
const EXECUTE_FAIL = "aziot/commands/EXECUTE_FAIL";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function _execute(setting) {
  return {
    type: EXECUTE,
    setting
  };
}

export function receiveCommand(command) {
  return async (dispatch, getState) => {
    executeCommand(command);
  };
}
