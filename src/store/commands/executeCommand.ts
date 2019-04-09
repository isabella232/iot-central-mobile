// @ts-ignore
import Torch from "react-native-torch";
import { Alert } from "react-native";

const commandMapping = {
  turn_on_flashlight: () => {
    Torch.switchState(true);
  },
  turn_off_flashlight: () => {
    Torch.switchState(false);
  },
  alert: () => {
    Alert.alert("Command Received from IoT Central.");
  }
};

export default async function executeCommmand(command: string) {
  if (commandMapping[command]) {
    return await commandMapping[command]();
  }
}
