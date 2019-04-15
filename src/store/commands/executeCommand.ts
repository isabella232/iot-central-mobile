// @ts-ignore
import Torch from "react-native-torch";
import { Alert } from "react-native";
import { setFlashlight } from "../flashlight";

const commandMapping = {
  turn_on_flashlight: () => {
    return setFlashlight(true);
  },
  turn_off_flashlight: () => {
    return setFlashlight(false);
  }
  //alert: () => {
  //  Alert.alert("Command Received from IoT Central.");
  //}
};

export default async function executeCommmand(command: string) {
  if (commandMapping[command]) {
    return commandMapping[command]();
  }
}
