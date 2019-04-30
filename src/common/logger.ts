import Tron from "reactotron-react-native";

export function logInfo(...params) {
  if (__DEV__ && Tron && Tron.log) {
    Tron.log(...params);
  }
}

export function logError(...params) {
  logInfo(params);
  if (!__DEV__) {
    // send analytics to app center
  }
}
