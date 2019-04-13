import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import * as Colors from "../styling/colors";

export interface Props extends NavigationProps {
  event: any;
  updateEvent: (value) => any;
}
export interface State {}
export default class EventDetails extends Component<Props, State> {
  render() {
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding">
        <TextInput
          onChangeText={this.props.updateEvent}
          value={this.props.event && this.props.event.value}
          placeholder="Enter Event Message."
        />
      </KeyboardAvoidingView>
    );
  }
}
const style = StyleSheet.create({
  container: {}
});
