import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import ThreeAxisTile from "./common/threeAxisTile";
import { gyroscope, SensorTypes } from "react-native-sensors";
import { ThreeAxisSensorState } from "../../store/sensors/telemetrySensors/helpers/threeAxis";

export interface Props extends NavigationProps, ThreeAxisSensorState {
  title: string;
  update: (data) => any;
  postTelemetry: (data) => any;
}
export interface State {}

export default class GyroscopeTile extends Component<Props, State> {
  render() {
    return (
      <ThreeAxisTile
        {...this.props}
        onPress={() => {}} //this.props.navigation.navigate("GyroscopeDetails")}
      />
    );
  }
}
