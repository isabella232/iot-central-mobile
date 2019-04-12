import React from "react";
import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Colors from "../../styling/colors";

export interface Props {
  title: string;
  value: any;
}

export interface State {}

export default class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={style.container}>
        <Text style={style.keyText}>{`${this.props.title}:`}</Text>
        <Text style={style.valueText}>{`${this.props.value}`}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  keyText: {
    fontWeight: "normal",
    fontSize: 15,
    color: Colors.IOTC_SUB_TEXT_COLOR
  },
  valueText: {
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.IOTC_SUB_TEXT_COLOR
  }
});
