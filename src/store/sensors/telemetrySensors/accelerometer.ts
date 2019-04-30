import ThreeAxisSensor, { ThreeAxisData } from "./helpers/threeAxis";
import {
  accelerometer as AccelerometerSensor,
  setUpdateIntervalForType
} from "react-native-sensors";
import DefaultSensor from "../common/defaultSensor";
import { postTelemetry } from "../../telemetry";

const initialDataState = {
  x: 0,
  y: 0,
  z: 0
};

const sensorName = "accelerometer";
const sensor = AccelerometerSensor;

class Accelerometer extends ThreeAxisSensor {
  constructor() {
    super(sensorName, sensor, initialDataState);
  }
  protected transformData(data) {
    return {
      accelerometerX: data.x,
      accelerometerY: data.y,
      accelerometerZ: data.z
    };
  }
}

export default new Accelerometer();

function transformData(data) {
  return {
    accelerometerX: data.x,
    accelerometerY: data.y,
    accelerometerZ: data.z
  };
}
