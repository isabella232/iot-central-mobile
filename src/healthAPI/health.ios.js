import AppleHealthKit from "rn-apple-healthkit";
import { NativeAppEventEmitter } from "react-native";

const PERMS = AppleHealthKit.Constants.Permissions;
const options = {
  permissions: {
    read: [PERMS.StepCount, PERMS.Steps],
    write: []
  }
};

function getSteps() {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getStepCount(null, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

export async function initialize() {
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        logError("Error initializing HealthKit");
        return reject(err);
      }
      AppleHealthKit.initStepCountObserver({}, () => {});
      resolve(results);
    });
  });
}

export async function subscribe(callback) {
  const subscription = NativeAppEventEmitter.addListener(
    "change:steps",
    async evt => {
      const data = await _getData();
      callback(data);
    }
  );
  return subscription;
}

export async function unsubscribe(subscription) {
  subscription.remove();
}

function isAvailable() {
  return new Promise((resolve, reject) => {
    AppleHealthKit.isAvailable((err, available) => {
      if (err) {
        reject(err);
      }
      resolve(available);
    });
  });
}
async function _getData() {
  const result = await getSteps();
  return { steps: result.value };
}
