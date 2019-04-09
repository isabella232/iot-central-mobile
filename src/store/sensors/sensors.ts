import telemetryReducers, {
  sensors as telemetrySensors
} from "../telemetrySensors";
import propertyReducers, {
  sensors as propertySensors
} from "../propertySensors";
import { combineReducers } from "redux";
import { Sensor } from "../common/SensorDuckInterface";

export default { ...telemetryReducers, ...propertyReducers };
const sensors = (telemetrySensors as Array<Sensor<any>>).concat(
  propertySensors
);
export function subscribeAll() {
  return async dispatch => {
    await dispatch(unsubscribeAll());
    return Promise.all(sensors.map(s => dispatch(s.subscribe())));
  };
}

export function unsubscribeAll() {
  return async dispatch => {
    return Promise.all(sensors.map(s => dispatch(s.unsubscribe())));
  };
}
