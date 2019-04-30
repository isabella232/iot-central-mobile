import DefaultSensor from "../../common/defaultSensor";
import { setUpdateIntervalForType } from "react-native-sensors";
import { SensorState } from "../../common/SensorDuckInterface";
import { postTelemetry } from "../../../telemetry";
export default class ThreeAxisSensor extends DefaultSensor<ThreeAxisData> {
  private subscription;
  constructor(sensorName, sensor, initialDataState) {
    super(sensorName, sensor, initialDataState);
  }
  subscribe() {
    return async (dispatch, getState) => {
      dispatch(this._subscribeSensor());
      dispatch(this._subscribeTelemetry());
    };
  }

  _subscribeTelemetry() {
    return (dispatch, getState) => {
      const telemetrySubscription = setInterval(() => {
        const sensorState = getState()[this.sensorName];
        const transform = this.transformData(sensorState.data);

        dispatch(postTelemetry(transform));
      }, getState()[this.sensorName].sendInterval);
      dispatch(this._subscribe(null, telemetrySubscription));
    };
  }

  _subscribeSensor() {
    return dispatch => {
      setUpdateIntervalForType(this.sensorName, 500);
      const sensorSubscription = this.sensor.subscribe(data => {
        dispatch(this.updateData(data));
      });
      dispatch(this._subscribe(sensorSubscription, null));
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      this._unsubscribeSensor();
      this._unsubscribeTelemetry();
      dispatch(this._unsubscribe());
    };
  }

  // TODO: these aren't updating redux state, need to break out into subscribe/unsubscribe methods for each
  _unsubscribeTelemetry() {
    return async (dispatch, getState) => {
      const sensorState = getState()[this.sensorName];
      sensorState.telemetrySubscription &&
        clearInterval(sensorState.telemetrySubscription);
    };
  }

  _unsubscribeSensor() {
    return async (dispatch, getState) => {
      const sensorState = getState()[this.sensorName];
      sensorState.sensorSubscription &&
        sensorState.sensorSubscription.unsubscribe();
    };
  }

  updateSend(shouldSend: boolean) {
    return async (dispatch, getState) => {
      if (shouldSend) {
        dispatch(this._unsubscribeTelemetry());
        dispatch(this._subscribeTelemetry());
      } else {
        dispatch(this._unsubscribeTelemetry());
      }
      dispatch(super.updateSend(shouldSend));
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
