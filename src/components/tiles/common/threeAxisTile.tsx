import React, { Component } from "react";
import DashboardTile from "./dashboardTile";
import { NavigationProps } from "../../props/NavigationProps";
import ThreeAxisText from "./threeAxisText";
import { Observable, Subscription } from "rxjs";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { SensorState } from "../../../store/common/SensorDuckInterface";
import {
  ThreeAxisSensorState,
  ThreeAxisData
} from "../../../store/sensors/telemetrySensors/helpers/threeAxis";

export interface Props extends NavigationProps, ThreeAxisSensorState {
  title: string;
  onPress: () => any;
  observable: Observable<ThreeAxisData>;
  type: SensorTypes;
  update: (data) => any;
  postTelemetry: (data) => any;
}

export interface State {}

export default class ThreeAxisTile extends Component<Props, State> {
  private sensorSubscription;
  private telemetrySubscription;

  /*
  componentDidMount() {
    setUpdateIntervalForType(this.props.type, 500);
    this.sensorSubscription = this.props.observable.subscribe(data => {
      this.props.update(data);
    });
    this.telemetrySubscription = setInterval(() => {
      this.props.postTelemetry({
        ...this.props.data
      });
    }, this.props.sendInterval);
  }

  componentWillUnmount() {
    this.sensorSubscription && this.sensorSubscription.unsubscribe();
    clearInterval(this.telemetrySubscription);
  }*/
  render() {
    return (
      <DashboardTile {...this.props} {...this.props}>
        <ThreeAxisText {...this.props.data} />
      </DashboardTile>
    );
  }
}
