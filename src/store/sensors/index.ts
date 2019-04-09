import geolocation, * as GEO from "./geolocationduck";
import magnetometer, * as MAGNET from "./magnetometerduck";
import accelerometer, * as ACCEL from "./accelerometerduck";
import gyroscope, * as GYRO from "./gyroscopeduck";
import deviceInfo, * as INFO from "./deviceinfoduck";
import pedometer, * as PEDO from "./pedometerduck";

export default {
  geolocation,
  magnetometer,
  accelerometer,
  gyroscope,
  deviceInfo,
  pedometer
};

//export const sensors = [GEO, MAGNET, ACCEL, GYRO, INFO, PEDO];
export const sensors = [MAGNET, ACCEL, GYRO, GEO, INFO, PEDO];
export const SENSOR_ACTION_TYPES = sensors.flatMap(sensor => [
  sensor.UPDATE,
  sensor.SUBSCRIBE,
  sensor.UNSUBSCRIBE
]);
