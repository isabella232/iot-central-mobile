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
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    /*
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
    );*/
  }
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
