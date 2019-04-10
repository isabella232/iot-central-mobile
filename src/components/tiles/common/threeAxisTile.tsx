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
  postTelemetry: (data) => any;
}

export interface State {}

export default class ThreeAxisTile extends Component<Props, State> {
  private sensorSubscription;
  private telemetrySubscription;

  componentDidMount() {
    setUpdateIntervalForType(this.props.type, 500);
    this.sensorSubscription = this.props.observable.subscribe(data => {
      this.props.update(data);
    });
    this.telemetrySubscription = setInterval(() => {
      this.props.postTelemetry({
        x: this.props.x,
        y: this.props.y,
        z: this.props.z
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    this.sensorSubscription && this.sensorSubscription.unsubscribe();
    clearInterval(this.telemetrySubscription);
  }
  render() {
    return (
      <DashboardTile {...this.props}>
        <ThreeAxisText {...this.props} />
      </DashboardTile>
    );
  }
}
