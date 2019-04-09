import accelerometer from "./accelerometer";
import gyroscope from "./gyroscope";
import magnetometer from "./magnetometer";
//import pedometer from "./pedometer";

export default {
  accelerometer: accelerometer.reducer,
  gyroscope: gyroscope.reducer,
  //pedometer: pedometer.reducer,
  magnetometer: magnetometer.reducer
};

export const sensors = [accelerometer, gyroscope, magnetometer]; //pedometer];
