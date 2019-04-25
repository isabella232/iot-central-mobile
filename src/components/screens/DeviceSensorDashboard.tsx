import { Component } from "react";
import React from "react";
import { AppState } from "react-native";
import * as Colors from "../styling/colors";
import { StyleSheet, View, Geolocation } from "react-native";
import { NavigationProps } from "../props/NavigationProps";
import MagnetometerDashboard from "../../containers/sensors/magnetometerDashboardContainer";
import GyroscopeDashboard from "../../containers/sensors/gyroscopeDashboardContainer";
import AccelerometerDashboard from "../../containers/sensors/accelerometerDashboardContainer";
import PedometerDashboard from "../../containers/sensors/pedometerDashboardContainer";

console.disableYellowBox = true;
export interface Props extends NavigationProps {
  subscribe;
  unsubscribe;
  subscribeSensors;
  unsubscribeSensors;
}
export interface State {}

export default class DeviceSensorDashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Telemetry"
  });

  async componentDidMount() {
    await this.props.subscribe();
    await this.props.subscribeSensors();
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  async componentWillUnmount() {
    await this.props.unsubscribe();
    await this.props.unsubscribeSensors();
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState !== "active") {
      this.props.unsubscribeSensors();
    } else {
      this.props.subscribeSensors();
    }
  };
  render() {
    return (
      <View style={style.container}>
        <View style={{ flexDirection: "row" }}>
          <AccelerometerDashboard navigation={this.props.navigation} />
          <MagnetometerDashboard navigation={this.props.navigation} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <GyroscopeDashboard navigation={this.props.navigation} />
          <PedometerDashboard navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
