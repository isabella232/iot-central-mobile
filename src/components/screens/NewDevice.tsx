import { Component } from "react";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import * as Colors from "../styling/colors";
import { NavigationProps } from "../props/NavigationProps";
import DeviceInfo from "react-native-device-info";

export interface Props extends NavigationProps {
  provisionDevice: (appId, deviceName) => any;
  isLoading: boolean;
}

export interface State {
  application;
  name: string;
}

export default class NewDevice extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const application = props.navigation.getParam("app");

    this.state = { application, name: DeviceInfo.getDeviceName() };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "New Device"
    };
  };

  async componentDidMount() {}

  // TODO migrate to fully managed react navigation
  handleTapped = async device => {};

  render() {
    if (this.props.isLoading) {
      return <ActivityIndicator size={"small"} />;
    } else {
      return (
        <KeyboardAvoidingView style={style.container} behavior="padding">
          <View style={style.textContainer}>
            <Text style={style.text}>Message:</Text>
            <TextInput
              style={style.textInput}
              returnKeyType="done"
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
              placeholder="Enter Device Name."
            />
          </View>
          <TouchableHighlight
            style={{
              ...style.button
            }}
            onPress={async () => {
              await this.props.provisionDevice(
                this.state.application.id,
                this.state.name
              );
              this.props.navigation.navigate("Dashboard");
            }}
          >
            <Text style={{ color: Colors.BUTTON_TEXT, fontSize: 20 }}>
              Create
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      );
    }
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
  textContainer: {
    backgroundColor: Colors.TILE_BACKGROUND_COLOR,
    flexDirection: "row",
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  button: {
    backgroundColor: Colors.BUTTON,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    marginBottom: 15,
    marginTop: 6,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5
  }
});
