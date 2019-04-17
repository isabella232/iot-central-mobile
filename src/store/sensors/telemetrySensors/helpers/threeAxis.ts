import DefaultSensor from "../../../common/defaultSensor";
import { setUpdateIntervalForType } from "react-native-sensors";
import { SensorState } from "../../../common/SensorDuckInterface";
import { postTelemetry } from "../../../telemetry";
import Tron from "reactotron-react-native";
export default class ThreeAxisSensor extends DefaultSensor<ThreeAxisData> {
  private subscription;
  constructor(sensorName, sensor, initialDataState) {
    super(sensorName, sensor, initialDataState);
  }
  subscribe() {
    return async (dispatch, getState) => {
      setUpdateIntervalForType(this.sensorName, 500);
      const sensorSubscription = this.sensor.subscribe(data => {
        dispatch(this.updateData(data));
      });
      const telemetrySubscription = setInterval(() => {
        const sensorState = getState()[this.sensorName];
        const transform = this.transformData(sensorState.data);

        dispatch(postTelemetry(transform));
      }, getState()[this.sensorName].sendInterval);
      dispatch(this._subscribe(sensorSubscription, telemetrySubscription));
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      const sensorState = getState()[this.sensorName];
      sensorState.sensorSubscription &&
        sensorState.sensorSubscription.unsubscribe();
      clearInterval(sensorState.telemetrySubscription);
      dispatch(this._unsubscribe());
    };
  }

  protected transformData(data): Object {
    throw new Error("Method not defined!");
  }
}

export interface ThreeAxisData {
  x: number;
  y: number;
  z: number;
}

export interface ThreeAxisSensorState extends SensorState<ThreeAxisData> {}
