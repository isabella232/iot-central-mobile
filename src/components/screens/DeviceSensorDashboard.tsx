import { Component } from "react";
import React from "react";
import { Button, SectionList, Text, ScrollView, Slider } from "react-native";
import { SafeAreaView } from "react-navigation";
import * as Colors from "../styling/colors";
import { StyleSheet, View, Geolocation } from "react-native";
import Compass from "../../containers/compassContainer";
import Level from "../../containers/levelContainer";
import { NavigationProps } from "../props/NavigationProps";
import { Grid, Col, Row } from "react-native-easy-grid";
import MagnetometerDashboard from "../../containers/magnetometerDashboardContainer";
import GyroscopeDashboard from "../../containers/gyroscopeDashboardContainer";
import AccelerometerDashboard from "../../containers/accelerometerDashboardContainer";
import PedometerDashboard from "../../containers/pedometerDashboardContainer";

console.disableYellowBox = true;
export interface Props extends NavigationProps {
  unsubscribeAll: () => {};
  stopSendingTelemetry: () => {};
  subscribe: () => {};
  updateSlider: (value) => {};
  sliderValue: number;
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
  }

  async componentWillUnmount() {
    await this.props.stopSendingTelemetry();
    await this.props.unsubscribeAll();
  }
  render() {
    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>å
      <Grid style={style.container}>
        <Row size={30}>
          <Col>
            <AccelerometerDashboard navigation={this.props.navigation} />
          </Col>
          <Col>
            <MagnetometerDashboard />
          </Col>
        </Row>
        <Row size={30}>
          <Col>
            <GyroscopeDashboard />
          </Col>
          <Col />
        </Row>
        <Row size={30} />
      </Grid>
      /*
      <Grid style={style.container}>
        <Row size={1}>
          <View style={style.compassContainer}>
            <Level perspective={400}>
              <Compass width={200} height={200} />
            </Level>
          </View>
        </Row>
        <Row size={1}>
          <ScrollView>
            <Row style={style.rowStyle}>
              <Col>
                <Slider
                  value={this.props.sliderValue}
                  onSlidingComplete={this.props.updateSlider}
                />
              </Col>
            </Row>
            <Row style={style.rowStyle}>
              <AccelerometerDashboad />
            </Row>
            <Row style={style.rowStyle}>
              <GyroscopeDashboard />
            </Row>
            <Row style={style.rowStyle}>
              <MagnetometerDashboard />
            </Row>
            <Row style={style.rowStyle}>
              <PedometerDashboard />
            </Row>
          </ScrollView>
        </Row>
      </Grid>*/
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  compassContainer: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 20
  },
  rowStyle: {
    backgroundColor: Colors.IOTC_BACKGROUND_COLOR,
    borderColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth * 10,
    flex: 1,
    padding: 10
  },
  columnStyle: {
    borderWidth: StyleSheet.hairlineWidth * 4,
    borderColor: "black",
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
