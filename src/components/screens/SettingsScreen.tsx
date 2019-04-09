import React, { Component } from "react";
import { Button, StyleSheet, View } from "react-native";
import LoginManager from "../../auth/AdalManager";
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
      <View style={style.container}>
        <Button title={"Logout"} onPress={this.onPress} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.IOTC_BACKGROUND_COLOR
  }
});
