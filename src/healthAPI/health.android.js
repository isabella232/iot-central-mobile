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
    GoogleFit.startRecording(
      async data => {
        const steps = await getSteps();
        callback(steps);
      },
      ["step"]
    );
    GoogleFit.observeSteps(async result => {
      const steps = await getSteps();
      callback(steps);
    });
    resolve();
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
  logInfo(result);
  const data = result.find(
    r => r.source === "com.google.android.gms:estimated_steps"
  );
  const steps = data.steps[0].value;
  return { steps };
}
