import React from "react";
import { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import AuthManager from "../../auth/AdalManager";
import { NavigationProps } from "../props/NavigationProps";

export interface Props extends NavigationProps {}

export interface State {}

export default class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this._validateUser();
  }

  _validateUser = async () => {
    const userToken = await AuthManager.getToken();
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
