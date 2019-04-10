import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import ThreeAxisTile from "./common/threeAxisTile";
import { magnetometer, SensorTypes } from "react-native-sensors";

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

export default class MagnetometerTile extends Component<Props, State> {
  render() {
    return (
      <ThreeAxisTile
        observable={magnetometer}
        type={SensorTypes.magnetometer}
        {...this.props}
        onPress={() => this.props.navigation.navigate("MagnetometerDetails")}
      />
    );
  }
}
