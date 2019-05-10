import { PermissionsAndroid } from "react-native";
import { logError, logInfo } from "../../../../common/logger";

export default async function requestPermission() {
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Device Location",
        message:
          "Az IoT Mobile needs to access your location to send it as a device property.",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    logInfo("Request Geolocation permission result", result);
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError("Error requesting Location permissions.", e);
  }
}
