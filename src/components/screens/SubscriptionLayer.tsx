import React from "react";
import { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationProps } from "../props/NavigationProps";
import * as Colors from "../styling/colors";
import AppTabNavigator from "../navigation/AppTab";

export interface Props extends NavigationProps {
  subscribe;
  unsubscribe;
}

export interface State {}

export default class SubscriptionLayer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    this.props.subscribe();
  }

  async componentWillUnmount() {
    this.props.unsubscribe();
  }

  render() {
    return <AppTabNavigator />;
  }
}
