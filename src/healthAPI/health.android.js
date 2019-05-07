import GoogleFit, { Scopes } from "react-native-google-fit";
import { logInfo, logError } from "../common/logger";

const options = {
  scopes: [Scopes.FITNESS_ACTIVITY_READ]
};

export async function initialize() {
  await GoogleFit.authorize(options);
}

export async function subscribe(callback) {
  return new Promise((resolve, reject) => {
    try {
      GoogleFit.startRecording(
        async data => {
          const steps = await getSteps();
          logInfo("Recording Steps: ", steps);
          callback(steps);
        },
        ["step"]
      );
      GoogleFit.observeSteps(async result => {
        const steps = await getSteps();
        logInfo("Observe Steps: ", steps);
        callback(steps);
      });
      resolve();
    } catch (e) {
      logError("Error observing Google Fit", e);
      reject(e);
    }
  });
}

export async function unsubscribe(subscription) {
  GoogleFit.unsubscribeListeners();
}

async function getSteps() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  const options = {
    startDate: start.toISOString(),
    endDate: end.toISOString()
  };
  const result = await GoogleFit.getDailyStepCountSamples(options);
  const data = result.find(
    r => r.source === "com.google.android.gms:estimated_steps"
  );
  const steps = data.steps[0] && data.steps[0].value;
  if (steps) {
    return { steps };
  }
  return { steps: 0 };
}
