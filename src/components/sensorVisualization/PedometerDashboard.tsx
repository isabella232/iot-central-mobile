import { Component } from "react";
import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import KeyValueText from "./keyValueText";
import * as Colors from "../styling/colors";

export interface Props {
  steps: number;
  title: string;
  sendData: (send) => {};
}

export interface State {}
export default class ThreeAxisDashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.titleText}>{this.props.title}</Text>

        <View style={style.subcontainer}>
          <KeyValueText title={"Steps"} value={this.props.steps} />

          <Switch />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  subcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    color: Colors.IOTC_TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 20
  }
});
