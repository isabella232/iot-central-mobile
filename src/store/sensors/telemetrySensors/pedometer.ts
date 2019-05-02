import DefaultSensor from "../common/defaultSensor";
// import AppleHealthKit from "rn-apple-healthkit";
import { NativeAppEventEmitter } from "react-native";
import { postTelemetry } from "../../telemetry";
import { logError } from "../../../common/logger";
/*
const PERMS = AppleHealthKit.Constants.Permissions;
const options = {
  permissions: {
    read: [PERMS.StepCount, PERMS.Steps],
    write: []
  }
};*/

/*
function getSteps(): Promise<any> {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getStepCount(null, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

function isAvailable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    AppleHealthKit.isAvailable((err, available) => {
      if (err) {
        reject(err);
      }
      resolve(available);
    });
  });
}*/

interface Data {
  steps: number;
}

class Pedometer extends DefaultSensor<Data> {
  constructor() {
    super("pedometer", null, initialDataState);
  }

  subscribe() {
    return async (dispatch, getState) => {
      /*
      AppleHealthKit.initHealthKit(options, (err: string, results: Object) => {
        if (err) {
          logError("Error initializing HealthKit");
          return;
        }
        AppleHealthKit.initStepCountObserver({}, () => {});
        const subscription = NativeAppEventEmitter.addListener(
          "change:steps",
          async evt => {
            const data = await this._getData();
            dispatch(this.updateData(data));
            dispatch(postTelemetry(data));
          }
        );
        dispatch(this._subscribe(subscription));
      });*/
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      const sensorState = getState()[this.sensorName];
      sensorState.sensorSubscription && sensorState.sensorSubscription.remove();
      dispatch(this._unsubscribe());
    };
  }

  async _getData() {
    //const result = await getSteps();
    //return { steps: result.value };
  }
}

const initialDataState = {
  steps: 0
};

const pedometer = new Pedometer();

export default pedometer;
