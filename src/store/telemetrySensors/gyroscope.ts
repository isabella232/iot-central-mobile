import ThreeAxisSensor from "./helpers/threeAxis";
import { gyroscope as Gyroscope } from "react-native-sensors";

const initialDataState = {
  x: 0,
  y: 0,
  z: 0
};

const sensorName = "gyroscope";
const sensor = Gyroscope;

const gyroscope = new ThreeAxisSensor(sensorName, sensor, initialDataState);

export default gyroscope;

function transformData(data) {
  return {
    gyroscopeX: data.x,
    gyroscopeY: data.y,
    gyroscopeZ: data.z
  };
}
