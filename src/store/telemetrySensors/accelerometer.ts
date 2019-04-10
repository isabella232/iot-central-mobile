import ThreeAxisSensor from "./helpers/threeAxis";
import { accelerometer as Accelerometer } from "react-native-sensors";

interface Data {
  accelerometerX: number;
  accelerometerY: number;
  accelerometerZ: number;
}

const initialDataState: Data = {
  accelerometerX: 0,
  accelerometerY: 0,
  accelerometerZ: 0
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
