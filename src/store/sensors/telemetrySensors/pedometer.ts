import DefaultSensor from "../common/defaultSensor";
import { postTelemetry } from "../../telemetry";
// @ts-ignore
import * as HealthAPI from "../../../healthAPI/health";
import { logError, logInfo } from "../../../common/logger";

interface Data {
  steps: number;
}

class Pedometer extends DefaultSensor<Data> {
  constructor() {
    super("pedometer", null, initialDataState);
  }

  subscribe() {
    return async (dispatch, getState) => {
      await HealthAPI.initialize()
        .then(async () => {
          logInfo("HealthAPI Initialized Successfully.");
          const subscription = await HealthAPI.subscribe(data => {
            dispatch(this.updateData(data));
            dispatch(postTelemetry(data));
          }).catch(err => logError("Error subscribing to health data.", err));
          dispatch(this._subscribe(subscription));
        })
        .catch(err => {
          logError("Error initializing HealthAPI", err);
        });
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      const sensorState = getState()[this.sensorName];
      sensorState.sensorSubscription &&
        HealthAPI.unsubscribe(sensorState.sensorSubscription);
      dispatch(this._unsubscribe());
    };
  }
}

const initialDataState = {
  steps: 0
};

const pedometer = new Pedometer();

export default pedometer;
