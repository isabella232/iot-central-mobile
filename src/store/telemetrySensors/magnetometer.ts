import ThreeAxisSensor from "./helpers/threeAxis";
import { magnetometer as Magnetometer } from "react-native-sensors";

const initialDataState = {
  x: 0,
  y: 0,
  z: 0
};

const sensorName = "magnetometer";
const sensor = Magnetometer;

const magnetometer = new ThreeAxisSensor(sensorName, sensor, initialDataState);

export default magnetometer;

function transformData(data) {
  return {
    magnetometerX: data.x,
    magnetometerY: data.y,
    magnetometerZ: data.z
  };
}
