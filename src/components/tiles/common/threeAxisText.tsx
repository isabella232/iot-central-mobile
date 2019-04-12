import React from "react";
import { Component } from "react";
import { View, StyleSheet } from "react-native";
import KeyValueText from "./keyValueText";

export interface Props {
  x: number;
  y: number;
  z: number;
}

export interface State {}

export default class extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <KeyValueText title={"x"} value={round(this.props.x)} />
        <KeyValueText title={"y"} value={round(this.props.y)} />
        <KeyValueText title={"z"} value={round(this.props.z)} />
      </View>
    );
  }
}

function round(value) {
  return value && Number(value.toFixed(3));
}

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
