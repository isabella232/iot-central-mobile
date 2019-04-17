import ThreeAxisSensor from "./helpers/threeAxis";
import { gyroscope as GyroscopeSensor } from "react-native-sensors";

const initialDataState = {
  x: 0,
  y: 0,
  z: 0
};

const sensorName = "gyroscope";
const sensor = GyroscopeSensor;

class Gyroscope extends ThreeAxisSensor {
  constructor() {
    super(sensorName, sensor, initialDataState);
  }
  protected transformData(data) {
    return {
      gyroscopeX: data.x,
      gyroscopeY: data.y,
      gyroscopeZ: data.z
    };
  }
}

export default new Gyroscope();

function transformData(data) {
  return {
    gyroscopeX: data.x,
    gyroscopeY: data.y,
    gyroscopeZ: data.z
  };
}
