import DefaultSensor from "../../common/defaultSensor";

export default class ThreeAxisSensor<Data extends Object> extends DefaultSensor<
  Data
> {
  subscribe() {
    return async (dispatch, getState) => {
      if (
        // getState().sensors[this.sensorName] &&
        // getState().sensors[this.sensorName].subscription ||
        !(await this.sensor.isAvailableAsync())
      ) {
        return Promise.resolve();
      } else {
        if (await this.sensor.hasListeners()) {
          await this.sensor.removeAllListeners();
        }

        const subscription = await this.sensor.addListener(data => {
          dispatch(this._update(data));
        });
        dispatch(this._subscribe());
        this.sensor.setUpdateInterval(500); //getState()[this.sensorName].interval);
      }
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      if (await this.sensor.hasListeners()) {
        await this.sensor.removeAllListeners();
      }
      dispatch(this._unsubscribe());
    };
  }
}
