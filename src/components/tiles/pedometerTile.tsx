import React, { Component } from "react";
import DashboardTile from "./common/dashboardTile";
import { NavigationProps } from "../props/NavigationProps";
import KeyValueText from "./common/keyValueText";
// import AppleHealthKit from "rn-apple-healthkit";
import { NativeAppEventEmitter } from "react-native";
import { SensorState } from "../../store/sensors/common/SensorDuckInterface";

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
