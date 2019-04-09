import { Gyroscope } from "expo-sensors";

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
    gyroscopeX: data.x,
    gyroscopeY: data.y,
    gyroscopeZ: data.z
  };
}

const sensorName = "gyroscope";
const sensor = Gyroscope;
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
