import React, { Component } from "react";
import { NavigationProps } from "../../props/NavigationProps";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import * as Colors from "../../styling/colors";
import { SensorState } from "../../../store/sensors/common/SensorDuckInterface";
import IntervalPicker from "./IntervalPicker";

export interface Props extends NavigationProps, SensorState<any> {
  updateSend: (send: boolean) => any;
  updateUseLargeTile: (use: boolean) => any;
  updateSimulate: (simulate: boolean) => any;
  updateSimulatedValue: (value: any) => any;
  updateSendFrequency: (value: number) => any;
  SmallTileComponent: any;
  LargeTileComponent: any;
  SimulatedValueSelectorComponent: any;
}
export interface State {}

// TODO: replace custom picker with npm package. Modal maybe?
// TODO: Talk to designers
// TODO: grey out interval picker on sending disabled
export default class SensorDetails extends Component<Props, State> {
  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <View style={style.switchRow}>
            <Text style={style.switchLabel}>Send Data</Text>
            <Switch
              value={this.props.shouldSend}
              onValueChange={value => this.props.updateSend(value)}
            />
          </View>
          <View
            style={{
              ...style.pickerContainer,
              opacity: this.props.shouldSend ? 1 : 0.5
            }}
            pointerEvents={this.props.shouldSend ? "auto" : "none"}
          >
            <Text style={style.switchLabel}>Send Frequency</Text>
            <IntervalPicker {...this.props} />
          </View>

          <View style={style.switchRow}>
            <Text style={style.switchLabel}>View Large Tile</Text>
            <Switch
              value={this.props.shouldUseLargeTile}
              onValueChange={value => this.props.updateUseLargeTile(value)}
            />
          </View>

          <View style={style.tileContainer} pointerEvents="none">
            {this.props.shouldUseLargeTile
              ? this.props.LargeTileComponent
              : this.props.SmallTileComponent}
          </View>
          <View style={style.switchRow}>
            <Text style={style.switchLabel}>Simulate Value</Text>
            <Switch
              value={this.props.shouldSimulate}
              onValueChange={value => this.props.updateSimulate(value)}
            />
          </View>
          <View style={style.simulatedSelectorContainer}>
            <Text style={style.switchLabel}>Override Values</Text>
            <View style={{ paddingLeft: 30 }}>
              {this.props.SimulatedValueSelectorComponent}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  /*
  handleInputChange = text => {
    if (/^\d+$/.test(text)) {
      const number = Number(text);
      this.props.updateSendFrequency(1000 * 60 * text);
    }
  };*/
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
    alignItems: "stretch"
  },
  tileContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200
  },
  switchLabel: {
    color: Colors.TILE_TITLE_COLOR,
    fontSize: 18,
    fontWeight: "500"
  },
  minuteLabel: {
    color: Colors.TILE_TITLE_COLOR,
    fontSize: 18,
    fontWeight: "600"
  },
  simulatedSelectorContainer: {
    padding: 10
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
