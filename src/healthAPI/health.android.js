import GoogleFit, { Scopes } from "react-native-google-fit";
import { logInfo, logError } from "../common/logger";

const options = {
  scopes: [Scopes.FITNESS_ACTIVITY_READ]
};

export async function initialize() {
  return GoogleFit.authorize(options);
}

export async function subscribe(callback) {
  return new Promise((resolve, reject) => {
    GoogleFit.observeSteps(result => {
      logInfo("Received Steps", result);
      resolve(result);
    });
  });
}

export async function unsubscribe(subscription) {
  GoogleFit.unsubscribeListeners();
}
