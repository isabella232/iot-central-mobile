import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import ThreeAxisTile from "./common/threeAxisTile";
import { accelerometer, SensorTypes } from "react-native-sensors";

export interface Props extends NavigationProps {
  x: number;
  y: number;
  z: number;
  isConnected: boolean;
  interval: number;
  title: string;
  update: (data) => any;
}
export interface State {}

export default class AccelerometerTile extends Component<Props, State> {
  render() {
    return (
      <ThreeAxisTile
        {...this.props}
        observable={accelerometer}
        type={SensorTypes.accelerometer}
        onPress={() => this.props.navigation.navigate("AccelerometerDetails")}
      />
    );
  }
}
