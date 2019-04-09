import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { Grid, Col, Row } from "react-native-easy-grid";
import { View, Text, Switch, StyleSheet } from "react-native";

export interface Props extends NavigationProps {
  send: boolean;
  largeTile: boolean;
  sendToCloud: (send: boolean) => any;
  useLargeTile: (use: boolean) => any;
}
export interface State {}
export default class SensorDetails extends Component<Props, State> {
  render() {
    return (
      <Grid>
        <Row style={style.switchRow}>
          <Text>Send Data to IoT Central</Text>
          <Switch
            value={this.props.send}
            onValueChange={value => this.props.sendToCloud(value)}
          />
        </Row>
        <Row style={style.switchRow}>
          <Text>View Large Tile</Text>
          <Switch
            value={this.props.largeTile}
            onValueChange={value => this.props.useLargeTile(value)}
          />
        </Row>
      </Grid>
    );
  }
}

const style = StyleSheet.create({
  switchRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
});
