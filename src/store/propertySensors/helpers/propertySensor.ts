import DefaultSensor from "../../common/defaultSensor";
import { postProperties } from "../../properties/reportedduck";
import IntervalSensor from "../../common/intervalSensor";

export default class PropertySensor<Data extends Object> extends IntervalSensor<
  Data
> {
  protected _update(data) {
    return async (dispatch, getState) => {
      await dispatch(super._update(data));
      const newState = getState()[this.sensorName].data;
      dispatch(postProperties(newState));
    };
  }
}
