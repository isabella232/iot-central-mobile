import ThreeAxisSensor from "./helpers/threeAxis";
import { magnetometer as MagnetometerSensor } from "react-native-sensors";

const initialDataState = {
  x: 0,
  y: 0,
  z: 0
};

const sensorName = "magnetometer";
const sensor = MagnetometerSensor;
class Magnetometer extends ThreeAxisSensor {
  constructor() {
    super(sensorName, sensor, initialDataState);
  }
  protected transformData(data) {
    return {
      magnetometerX: data.x,
      magnetometerY: data.y,
      magnetometerZ: data.z
    };
  }
}

export default new Magnetometer();

function transformData(data) {
  return {
    magnetometerX: data.x,
    magnetometerY: data.y,
    magnetometerZ: data.z
  };
}
