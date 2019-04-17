import { Component } from "react";
import React from "react";
import { Button, SectionList, Text, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-navigation";
import * as Colors from "../styling/colors";
import { StyleSheet, View, Geolocation } from "react-native";
import Compass from "../../containers/sensors/compassContainer";
import Level from "../../containers/sensors/levelContainer";
import { NavigationProps } from "../props/NavigationProps";
import { Grid, Col, Row } from "react-native-easy-grid";
import MagnetometerDashboard from "../../containers/sensors/magnetometerDashboardContainer";
import GyroscopeDashboard from "../../containers/sensors/gyroscopeDashboardContainer";
import AccelerometerDashboard from "../../containers/sensors/accelerometerDashboardContainer";
import PedometerDashboard from "../../containers/sensors/pedometerDashboardContainer";

console.disableYellowBox = true;
export interface Props extends NavigationProps {
  subscribe;
  unsubscribe;
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
    await this.props.unsubscribe();
  }
  render() {
    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>å
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
