import DefaultSensor from "../common/defaultSensor";
import IntervalSensor from "../common/intervalSensor";
// import AppleHealthKit from "rn-apple-healthkit";

const options = {
  permissions: {
    read: ["StepCount"],
    write: []
  }
};

/*
AppleHealthKit.initHealthKit(options, (err: string, results: Object) => {
  if (err) {
    console.log("error initializing Healthkit: ", err);
    return;
  }
});*/

/*
function getSteps(): Promise<any> {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getStepCount(null, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

function isAvailable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    AppleHealthKit.isAvailable((err, available) => {
      if (err) {
        reject(err);
      }
      resolve(available);
    });
  });
}*/

interface Data {
  steps: number;
}

class Pedometer extends IntervalSensor<Data> {
  constructor() {
    super("pedometer", null, initialDataState);
  }
  /*
  async _isAvailable() {
    return isAvailable();
  }*/
  /*
  async _getData() {
    const result = await getSteps();
    return { steps: result.value };
  }*/
}

const initialDataState = {
  steps: 0
};

const pedometer = new Pedometer();

export default pedometer;
