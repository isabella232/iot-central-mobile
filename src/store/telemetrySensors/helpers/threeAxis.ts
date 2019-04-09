import DefaultSensor from "../../common/defaultSensor";
import { setUpdateIntervalForType } from "react-native-sensors";

export default class ThreeAxisSensor<Data extends Object> extends DefaultSensor<
  Data
> {
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
          dispatch(this._update(data));
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
