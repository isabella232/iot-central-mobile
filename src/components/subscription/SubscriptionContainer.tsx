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

export interface Props {
  subscribe: () => any;
  unsubscribe: () => any;
}

export interface State {}

export default class LoginScreen extends Component<Props, State> {
  componentDidMount() {
    this.props.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
