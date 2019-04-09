import React, { Component } from "react";
import DashboardTile from "./common/dashboardTile";
import { NavigationProps } from "../props/NavigationProps";
import KeyValueText from "./common/keyValueText";

export interface Props extends NavigationProps {
  steps: number;
  title: string;
  isConnected: boolean;
  interval: number;
}

export interface State {}

export default class PedometerTile extends Component<Props, State> {
  render() {
    return (
      <DashboardTile
        onPress={() => this.props.navigation.navigate("PedometerDetails")}
        {...this.props}
      >
        <KeyValueText title={"Steps"} value={this.props.steps} />
      </DashboardTile>
    );
  }
}
