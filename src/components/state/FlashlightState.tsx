import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import * as Colors from "../styling/colors";

export interface Props {
  setFlashlight: (value) => {};
  value: boolean;
}
export interface State {}
export default class FlashlightState extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Flashlight</Text>
        <View style={style.toggleContainer}>
          <TouchableHighlight
            onPress={() => this.props.setFlashlight(true)}
            style={{
              ...style.toggle,
              backgroundColor: this.props.value
                ? Colors.BUTTON
                : Colors.TILE_BACKGROUND_COLOR,
              underlayColor: !this.props.value
                ? Colors.BUTTON
                : Colors.TILE_BACKGROUND_COLOR
            }}
          >
            <Text style={{ ...style.toggleText }}>On</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.setFlashlight(false)}
            style={{
              ...style.toggle,
              backgroundColor: this.props.value
                ? Colors.TILE_BACKGROUND_COLOR
                : Colors.BUTTON,
              underlayColor: !this.props.value
                ? Colors.TILE_BACKGROUND_COLOR
                : Colors.BUTTON
            }}
          >
            <Text style={{ ...style.toggleText }}>Off</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10
  },
  title: {
    fontSize: 24,
    color: Colors.TILE_TITLE_COLOR
  },
  toggle: { flex: 1, marginTop: 8, alignItems: "center" },
  toggleText: { padding: 10, fontSize: 20 },
  toggleContainer: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5
  }
});
