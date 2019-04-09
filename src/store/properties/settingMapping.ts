// @ts-ignore
import Torch from "react-native-torch";
//import { Audio } from "expo-av";
import * as Brightness from "expo-brightness";

const settingMapping = {
  flashlight: value => {
    Torch.switchState(value);
  },
  /*
  volume: async value => {
    const playbackObject = await Audio.Sound.createAsync(
      { uri: "http://sndf.li/" },
      { shouldPlay: true }
    );
  },*/
  brightness: async value => {
    await Brightness.setBrightnessAsync(value / 100);
  }
};

export default settingMapping;
