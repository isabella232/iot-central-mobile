import ThreeAxisSensor from "./helpers/threeAxis";
import { Magnetometer } from "react-native-sensors";

interface Data {
  magnetometerX: number;
  magnetometerY: number;
  magnetometerZ: number;
}

const initialDataState: Data = {
  magnetometerX: 0,
  magnetometerY: 0,
  magnetometerZ: 0
};

const sensorName = "magnetometer";
const sensor = Magnetometer;

const magnetometer = new ThreeAxisSensor(
  sensorName,
  sensor,
  initialDataState,
  transformData
);

export default magnetometer;

function transformData(data) {
  return {
    magnetometerX: data.x,
    magnetometerY: data.y,
    magnetometerZ: data.z
  };
}
