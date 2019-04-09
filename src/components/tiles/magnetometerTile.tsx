import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import ThreeAxisTile from "./common/threeAxisTile";

export interface Props extends NavigationProps {
  x: number;
  y: number;
  z: number;
  isConnected: boolean;
  interval: number;
  title: string;
}
export interface State {}

export default class MagnetometerTile extends Component<Props, State> {
  render() {
    return (
      <ThreeAxisTile
        {...this.props}
        onPress={() => this.props.navigation.navigate("MagnetometerDetails")}
      />
    );
  }
}
