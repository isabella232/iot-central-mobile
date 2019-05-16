import Tron from "reactotron-react-native";
import Analytics from "appcenter-analytics";

export function logInfo(...params) {
  if (__DEV__ && Tron && Tron.log) {
    Tron.log(...params);
    console.log(...params);
  } else {
    console.log(...params);
  }
}

export function logError(...params) {
  logInfo({ params });
  if (!__DEV__) {
    // send analytics to app center
  }
}

export async function logAppCenter(
  event: string,
  properties?: { [name: string]: string }
) {
  if (!__DEV__) {
    await Analytics.trackEvent(event, properties).catch(e => logError(e));
  }
}
