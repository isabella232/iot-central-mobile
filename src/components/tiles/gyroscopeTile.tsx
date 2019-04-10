import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import ThreeAxisTile from "./common/threeAxisTile";
import { gyroscope, SensorTypes } from "react-native-sensors";

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

export default class GyroscopeTile extends Component<Props, State> {
  render() {
    return (
      <ThreeAxisTile
        {...this.props}
        observable={gyroscope}
        type={SensorTypes.gyroscope}
        onPress={() => this.props.navigation.navigate("GyroscopeDetails")}
      />
    );
  }
}
