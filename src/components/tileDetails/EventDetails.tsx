import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Text
} from "react-native";
import * as Colors from "../styling/colors";

export interface Props extends NavigationProps {
  event: any;
  updateEvent: (value) => any;
}
export interface State {}
export default class EventDetails extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Event Details")
    };
  };
  render() {
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding">
        <View style={style.textContainer}>
          <Text style={style.text}>Message:</Text>
          <TextInput
            style={style.textInput}
            returnKeyType="done"
            onChangeText={this.props.updateEvent}
            value={this.props.event && this.props.event.value}
            placeholder="Enter Event Message."
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const style = StyleSheet.create({
  textInput: {
    fontSize: 20,
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    padding: 10
  },
  container: { paddingTop: 10 },
  textContainer: {
    backgroundColor: Colors.TILE_BACKGROUND_COLOR,
    flexDirection: "row"
  }
});
