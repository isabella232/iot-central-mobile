import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { StyleSheet, Button, SafeAreaView, View } from "react-native";
import EventTileButton from "./helpers/eventTileButton";
import { ScrollView } from "react-native-gesture-handler";
import FlashlightState from "../state/FlashlightState";
import VisibleFlashlightState from "../../containers/state/FlashlightContainer";

export interface Props extends NavigationProps {
  events: any;
  sendEvent: (event) => any;
  updateEvent: (event, value) => any;
}
export interface State {}

export default class DeviceStateDashboard extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "State"
    };
  };
  render() {
    return (
      <View style={style.container}>
        <VisibleFlashlightState />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
