import { Accelerometer } from "expo-sensors";

import * as duckBuilder from "./threeaxishelpers";

const initialState = {
  subscription: null,
  data: {
    x: 0,
    y: 0,
    z: 0
  }
};

function transformData(data) {
  return {
    accelerometerX: data.x,
    accelerometerY: data.y,
    accelerometerZ: data.z
  };
}

const sensorName = "accelerometer";
const sensor = Accelerometer;
const reducer = duckBuilder.buildReducer(sensorName, initialState);
export const subscribe = duckBuilder.buildSubscribe(
  sensorName,
  sensor,
  transformData
);
export const unsubscribe = duckBuilder.buildUnsubscribe(sensorName, sensor);
export default reducer;
export const { SUBSCRIBE, UNSUBSCRIBE, UPDATE } = {
  SUBSCRIBE: duckBuilder.subscribeAction(sensorName),
  UNSUBSCRIBE: duckBuilder.unsubscribeAction(sensorName),
  UPDATE: duckBuilder.updateAction(sensorName)
};
