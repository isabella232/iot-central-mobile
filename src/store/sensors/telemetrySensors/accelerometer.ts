import ThreeAxisSensor from "./helpers/threeAxis";
import { accelerometer as Accelerometer } from "react-native-sensors";

const initialDataState = {
  x: 0,
  y: 0,
  z: 0
};

const sensorName = "accelerometer";
const sensor = Accelerometer;

const accelerometer = new ThreeAxisSensor(sensorName, sensor, initialDataState);

export default accelerometer;

function transformData(data) {
  return {
    accelerometerX: data.x,
    accelerometerY: data.y,
    accelerometerZ: data.z
  };
}
