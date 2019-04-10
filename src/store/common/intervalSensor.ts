import DefaultSensor from "./defaultSensor";

export default class IntervalSensor<Data extends Object> extends DefaultSensor<
  Data
> {
  subscribe() {
    return async (dispatch, getState) => {
      if (
        //!getState().sensors.pedometer.subscription &&
        await this._isAvailable()
      ) {
        await this.unsubscribe();
        const subscription = setInterval(async () => {
          const data = await this._getData();
          dispatch(this._update(data));
        }, 1000);
        dispatch(this._subscribe(subscription));
      }
    };
  }

  unsubscribe() {
    return async (dispatch, getState) => {
      const subscription =
        getState()[this.sensorName] && getState()[this.sensorName].subscription;
      if (subscription) {
        clearInterval(subscription);
        dispatch(this._unsubscribe());
      }
    };
  }

  protected async _isAvailable(): Promise<boolean> {
    throw Error("Not implemented.");
  }

  protected async _getData(): Promise<Data> {
    throw Error("Not implemented.");
  }
}
