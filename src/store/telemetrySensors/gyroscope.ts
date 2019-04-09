import ThreeAxisSensor from "./helpers/threeAxis";
import { gyroscope as Gyroscope } from "react-native-sensors";

interface Data {
  gyroscopeX: number;
  gyroscopeY: number;
  gyroscopeZ: number;
}

const initialDataState: Data = {
  gyroscopeX: 0,
  gyroscopeY: 0,
  gyroscopeZ: 0
};

const sensorName = "gyroscope";
const sensor = Gyroscope;

const gyroscope = new ThreeAxisSensor(
  sensorName,
  sensor,
  initialDataState,
  transformData
);

export default gyroscope;

function transformData(data) {
  return {
    gyroscopeX: data.x,
    gyroscopeY: data.y,
    gyroscopeZ: data.z
  };
}
