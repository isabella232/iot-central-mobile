import React, { Component } from "react";
import DashboardTile from "./dashboardTile";
import { NavigationProps } from "../../props/NavigationProps";
import ThreeAxisText from "./threeAxisText";

export interface Props extends NavigationProps {
  x: number;
  y: number;
  z: number;
  title: string;
  isConnected: boolean;
  interval: number;
  onPress: () => any;
}

export interface State {}

export default class ThreeAxisTile extends Component<Props, State> {
  render() {
    return (
      <DashboardTile {...this.props}>
        <ThreeAxisText {...this.props} />
      </DashboardTile>
    );
  }
}
