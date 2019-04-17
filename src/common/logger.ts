import Tron from "reactotron-react-native";

export default function(...params) {
  if (__DEV__ && Tron && Tron.log) {
    Tron.log(...params);
  }
}
