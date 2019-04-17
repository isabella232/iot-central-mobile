import React from "react";
import { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationProps } from "../props/NavigationProps";
import * as Colors from "../styling/colors";

export interface Props extends NavigationProps {
  device;
  subscribe;
  unsubscribe;
}

export interface State {}

export default class AppLoading extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  async componentWillUnmount() {
    this.props.unsubscribe();
  }

  async componentDidMount() {
    this.props.subscribe();

    this._validateDevice();
  }

  _validateDevice = async () => {
    this.props.navigation.navigate(this.props.device ? "App" : "SelectDevice");
  };

  render() {
    return (
      <View style={LoginStyle.container}>
        <View style={LoginStyle.photoView}>
          <Image
            style={LoginStyle.photo}
            source={require("../../../assets/images/iotc-logo.png")}
          />
          <Text style={LoginStyle.infoText}>{"Azure IoT Mobile"}</Text>
        </View>
      </View>
    );
  }
}

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.IOTC_BACKGROUND_COLOR,
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: Colors.IOTC_BUTTON_BACKGROUND_COLOR
  },
  photo: {
    height: 250,
    width: 250,
    borderRadius: 20
  },
  photoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  infoText: {
    color: Colors.IOTC_TEXT_COLOR,
    textAlign: "center",
    paddingBottom: 60,
    paddingTop: 40,
    fontSize: 24
  }
});
