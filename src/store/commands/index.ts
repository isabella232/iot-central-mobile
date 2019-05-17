import { setFlashlight } from "../flashlight";
import { Alert } from "react-native";
import { logInfo } from "../../common/logger";

const EXECUTE = "aziot/commands/EXECUTE";
const EXECUTE_SUCCESS = "aziot/commands/EXECUTE_SUCCESS";
const EXECUTE_FAIL = "aziot/commands/EXECUTE_FAIL";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EXECUTE:
      return {
        ...state,
        [action.command]: {
          timestamp: action.timestamp
        }
      };
    default:
      return state;
  }
}

function _execute(command) {
  return {
    type: EXECUTE,
    command,
    timestamp: Date.now()
  };
}

export function receiveCommand(command) {
  return async (dispatch, getState) => {
    logInfo("Command Received in FE", command);
    switch (command) {
      case "turn_on_flashlight":
        return await dispatch(setFlashlight(true));
      case "turn_off_flashlight":
        return await dispatch(setFlashlight(false));
      case "alert":
        return Alert.alert("Command Received!");
    }
    // await dispatch(executeCommand(command));
    dispatch(_execute(command));
  };
}
