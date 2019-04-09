import React from "react";
import { Button, View, StyleSheet } from "react-native";
import * as Colors from "../styling/colors";

export interface Props {
  title: string;
  onPress: () => any;
}

export interface State {}

export default class IoTCentralButton extends React.Component<Props, State> {
  render() {
    return (
      <View style={ButtonStyle.buttonView}>
        <Button
          onPress={this.props.onPress}
          title={this.props.title}
          color={Colors.IOTC_TEXT_COLOR}
        />
      </View>
    );
  }
}

const ButtonStyle = StyleSheet.create({
  buttonView: {
    backgroundColor: Colors.IOTC_BUTTON_BACKGROUND_COLOR,
    margin: 20,
    justifyContent: "center"
  }
});
