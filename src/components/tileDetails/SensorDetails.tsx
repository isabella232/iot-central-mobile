import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { Grid, Col, Row } from "react-native-easy-grid";
import { View, Text, Switch, StyleSheet } from "react-native";
import * as Colors from "../styling/colors";

export interface Props extends NavigationProps {
  shouldSend: boolean;
  shouldUseLargeTile: boolean;
  shouldSimulate: boolean;
  simulatedValue: any;
  sendFrequency: number;
  updateSend: (send: boolean) => any;
  updateUseLargeTile: (use: boolean) => any;
  updateSimulate: (simulate: boolean) => any;
  updateSimulatedValue: (value: any) => any;
  updateSendFrequency: (value: number) => any;
  SmallTileComponent: Component;
  LargeTileComponent: Component;
  SimulatedValueSelectorComponent: Component;
}
export interface State {}
export default class SensorDetails extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <View style={style.switchRow}>
          <Text style={style.switchLabel}>Send Data</Text>
          <Switch
            value={this.props.shouldSend}
            onValueChange={value => this.props.updateSend(value)}
          />
        </View>
        <View style={style.switchRow}>
          <Text style={style.switchLabel}>View Large Tile</Text>
          <Switch
            value={this.props.shouldUseLargeTile}
            onValueChange={value => this.props.updateUseLargeTile(value)}
          />
        </View>
        <View style={style.switchRow}>
          <Text style={style.switchLabel}>Simulate Value</Text>
          <Switch
            value={this.props.shouldSimulate}
            onValueChange={value => this.props.updateSimulate(value)}
          />
        </View>
        <View style={style.tileRow}>
          {this.props.shouldUseLargeTile
            ? this.props.LargeTileComponent
            : this.props.SmallTileComponent}
        </View>
        <View>{this.props.SimulatedValueSelectorComponent}</View>
        <View />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  tileRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  switchLabel: {
    color: Colors.TILE_TITLE_COLOR,
    fontSize: 18,
    fontWeight: "500"
  }
});
