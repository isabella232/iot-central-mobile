import React, { Component } from "react";
import DashboardTile from "./dashboardTile";
import { NavigationProps } from "../../props/NavigationProps";
import ThreeAxisText from "./threeAxisText";
import { Observable, Subscription } from "rxjs";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

export interface Props extends NavigationProps {
  x: number;
  y: number;
  z: number;
  title: string;
  isConnected: boolean;
  interval: number;
  onPress: () => any;
  observable: Observable<{ x: number; y: number; z: number }>;
  type: SensorTypes;
  update: (data) => any;
}

export interface State {}

export default class ThreeAxisTile extends Component<Props, State> {
  private subscription;

  componentDidMount() {
    setUpdateIntervalForType(this.props.type, 1101);
    if (!this.subscription) {
      this.subscription = this.props.observable.subscribe(data => {
        this.props.update(data);
      });
    }
  }

  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
  }
  render() {
    return (
      <DashboardTile {...this.props}>
        <ThreeAxisText {...this.props} />
      </DashboardTile>
    );
  }
}
