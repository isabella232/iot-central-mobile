import React, { Component } from "react";
import DashboardTile from "./common/dashboardTile";
import { NavigationProps } from "../props/NavigationProps";
import KeyValueText from "./common/keyValueText";
// import AppleHealthKit from "rn-apple-healthkit";
import { NativeAppEventEmitter } from "react-native";
import { SensorState } from "../../store/common/SensorDuckInterface";

export interface Props extends NavigationProps, SensorState<{ steps: number }> {
  postTelemetry: (data) => any;
  title: "Pedometer";
  update: (data) => any;
}

export interface State {}

const options = {
  permissions: {
    read: ["StepCount", "Steps"],
    write: []
  }
};

export default class PedometerTile extends Component<Props, State> {
  private subscription;
  async componentDidMount() {
    /*
    this.subscription = setInterval(async () => {
      AppleHealthKit.initHealthKit(
        options,
        async (err: string, results: Object) => {
          if (err) {
            console.log("error initializing Healthkit: ", err);
            return;
          }
          const steps = await getSteps();
          this.props.update({ steps });
        }
      );
    }, 1000);*/
    /*
      AppleHealthKit.initStepCountObserver({}, () => {});
      this.subscription = NativeAppEventEmitter.addListener(
        "change:steps",
        async evt => {
          try {
            const available = await isAvailable();
            if (available) {
              const steps = await getSteps();
              this.props.update({ steps });
            } else {
              console.log("HealthKit Unavailable");
            }
          } catch (e) {}
        }
      );
      */
  }

  componentWillUnmount() {
    // clearInterval(this.subscription);
  }

  render() {
    return (
      <DashboardTile
        onPress={() => this.props.navigation.navigate("PedometerDetails")}
        {...this.props}
      >
        <KeyValueText title={"Steps"} value={this.props.data.steps} />
      </DashboardTile>
    );
  }
}

/*
function getSteps(): Promise<any> {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  let options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
  return new Promise((resolve, reject) => {
    AppleHealthKit.getStepCount(null, (err, result) => {
      if (err || !result) {
        return reject(err || "No result");
      }

      resolve(result.value);
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
