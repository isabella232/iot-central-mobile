import { Component } from "react";
import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import IoTCentralButton from "../buttons/styledButton";
import * as Colors from "../styling/colors";
import { NavigationProps } from "../props/NavigationProps";
import AuthManager from "../../auth/AdalManager";

export interface Props extends NavigationProps {}

export interface State {}

export default class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  login = () => {
    AuthManager.login().then(() => {
      const { navigate } = this.props.navigation;
      navigate("App");
    });
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
        <IoTCentralButton onPress={this.login} title="Log In" />
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
