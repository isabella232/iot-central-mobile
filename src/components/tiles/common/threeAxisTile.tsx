import React, { Component } from "react";
import DashboardTile from "./dashboardTile";
import { NavigationProps } from "../../props/NavigationProps";
import ThreeAxisText from "./threeAxisText";
import { SensorTypes } from "react-native-sensors";
import { ThreeAxisSensorState } from "../../../store/sensors/telemetrySensors/helpers/threeAxis";

export interface Props extends NavigationProps, ThreeAxisSensorState {
  title: string;
  onPress: () => any;
}

export interface State {}

export default class ThreeAxisTile extends Component<Props, State> {
  render() {
    return (
      <DashboardTile {...this.props} {...this.props}>
        <ThreeAxisText {...this.props.data} />
      </DashboardTile>
    );
  }
}
