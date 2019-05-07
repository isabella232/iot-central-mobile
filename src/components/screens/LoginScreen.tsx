import { Component } from "react";
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from "react-native";
import * as Colors from "../styling/colors";
import { NavigationProps } from "../props/NavigationProps";
import AuthManager from "../../auth/AdalManager";
import { buttonStyle } from "../styling";

export interface Props extends NavigationProps {}

export interface State {}

export default class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  login = () => {
    const { navigate } = this.props.navigation;
    AuthManager.login().then(token => {
      if (token) {
        navigate("App");
      }
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
        <TouchableHighlight style={buttonStyle.button} onPress={this.login}>
          <Text style={buttonStyle.buttonText}>Log In</Text>
        </TouchableHighlight>
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
