import ThreeAxisSensor from "./helpers/threeAxis";
import { Accelerometer } from "expo-sensors";

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

const accelerometer = new ThreeAxisSensor(
  sensorName,
  sensor,
  initialDataState,
  transformData
);

export default accelerometer;

function transformData(data) {
  return {
    accelerometerX: data.x,
    accelerometerY: data.y,
    accelerometerZ: data.z
  };
}
