import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Colors from "../styling/colors";
import { Application } from "../../httpClients/IoTCentral";

export interface Props {
  handlePressed: (appId: string) => any;
  application: Application;
}

export interface State {}

export default class ApplicationRow extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.handlePressed(this.props.application.id)}
      >
        <View style={RowStyle.container}>
          <Text style={RowStyle.text}>{`${this.props.application.name}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const RowStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginLeft: 0,
    fontSize: 20,
    color: Colors.IOTC_TEXT_COLOR
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});
