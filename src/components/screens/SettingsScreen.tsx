import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from "react-native";
import { NavigationProps } from "../props/NavigationProps";
import * as Colors from "../styling/colors";

export interface Props extends NavigationProps {
  logout: () => {};
}

export interface State {}

export default class SettingsPage extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings"
  });

  onPress = async () => {
    await this.props.logout();
    this.props.navigation.navigate("Auth");
  };
  render() {
    return (
      <TouchableHighlight
        style={{
          ...style.button
        }}
        onPress={this.onPress}
      >
        <Text style={{ color: Colors.BUTTON_TEXT, fontSize: 20 }}>Logout</Text>
      </TouchableHighlight>
    );
  }
}
const style = StyleSheet.create({
  button: {
    backgroundColor: "red",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    marginBottom: 15,
    marginTop: 6,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5
  }
});
