import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { View, Text, Switch, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import * as Colors from "../styling/colors";
import SensorDetails from "./common/SensorDetails";
import AccelerometerTile from "../../containers/sensors/accelerometerDashboardContainer";
import { SensorState } from "../../store/sensors/common/SensorDuckInterface";
import { ThreeAxisSensorState } from "../../store/sensors/telemetrySensors/helpers/threeAxis";

export interface Props extends NavigationProps, ThreeAxisSensorState {
  updateSend: (send: boolean) => any;
  updateUseLargeTile: (use: boolean) => any;
  updateSimulate: (simulate: boolean) => any;
  updateSimulatedValue: (value: any) => any;
  updateSendFrequency: (value: number) => any;
}

export interface State {}

export default class AccelerometerDetails extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Accelerometer"
    };
  };
  render() {
    return (
      <SensorDetails
        {...this.props}
        SmallTileComponent={<AccelerometerTile />}
        LargeTileComponent={<AccelerometerTile />}
        SimulatedValueSelectorComponent={
          <View style={style.sliderContainer}>
            <View style={style.sliderRow}>
              <Text>X</Text>
              <Slider
                style={style.slider}
                value={this.props.simulatedValue.x}
                onSlidingComplete={value =>
                  this.props.updateSimulatedValue({ x: value })
                }
              />
            </View>
            <View style={style.sliderRow}>
              <Text>Y</Text>
              <Slider
                style={style.slider}
                value={this.props.simulatedValue.y}
                onSlidingComplete={value =>
                  this.props.updateSimulatedValue({ y: value })
                }
              />
            </View>
            <View style={style.sliderRow}>
              <Text>Z</Text>
              <Slider
                style={style.slider}
                value={this.props.simulatedValue.z}
                onSlidingComplete={value =>
                  this.props.updateSimulatedValue({ z: value })
                }
              />
            </View>
          </View>
        }
      />
    );
  }
}

const style = StyleSheet.create({
  sliderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0
  },
  slider: {
    flexGrow: 1,
    marginLeft: 20
  },
  sliderContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 10
  }
});
