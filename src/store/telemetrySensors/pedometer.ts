import DefaultSensor from "../common/defaultSensor";
import { Pedometer as ExpoPedometer } from "expo-sensors";
import IntervalSensor from "../common/intervalSensor";

interface Data {
  steps: number;
}

class Pedometer extends IntervalSensor<Data> {
  constructor() {
    super("pedometer", ExpoPedometer, initialDataState);
  }
  async _isAvailable() {
    return this.sensor.isAvailableAsync();
  }
  _getData() {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    return this.sensor.getStepCountAsync(start, new Date());
  }
}

const initialDataState = {
  steps: 0
};

const pedometer = new Pedometer();

export default pedometer;
