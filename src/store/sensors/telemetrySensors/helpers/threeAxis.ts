import DefaultSensor from "../../../common/defaultSensor";
import { setUpdateIntervalForType } from "react-native-sensors";
import { SensorState } from "../../../common/SensorDuckInterface";

export default class ThreeAxisSensor extends DefaultSensor<ThreeAxisData> {
  private subscription;
  subscribe() {
    return async (dispatch, getState) => {
      if (
        !getState()[this.sensorName] ||
        getState()[this.sensorName].subscription
      ) {
        return Promise.resolve();
      } else {
        this.subscription = await this.sensor.subscribe(data => {
          dispatch(this.updateData(data));
        });
        dispatch(this._subscribe());
        setUpdateIntervalForType(this.sensorName, 500); //getState()[this.sensorName].interval);
      }
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      const subscription = this.subscription; //getState()[this.sensorName].subscription;
      if (subscription) {
        subscription.unsubscribe();
      }
      dispatch(this._unsubscribe());
      /*
      if (await this.sensor.hasListeners()) {
        await this.sensor.removeAllListeners();
      }
      dispatch(this._unsubscribe());*/
    };
  }
}

export interface ThreeAxisData {
  x: number;
  y: number;
  z: number;
}

export interface ThreeAxisSensorState extends SensorState<ThreeAxisData> {}
