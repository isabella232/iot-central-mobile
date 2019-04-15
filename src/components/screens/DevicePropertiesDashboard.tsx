import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import VisibleGeolocation from "../../containers/properties/geolocationTileContainer";
import VisibleDeviceInfo from "../../containers/properties/deviceInfoContainer";

export interface Props extends NavigationProps {
  events: any;
  sendEvent: (event) => any;
  updateEvent: (event, value) => any;
}
export interface State {}

export default class DevicePropertiesDashboard extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Properties"
    };
  };
  render() {
    return (
      <ScrollView contentContainerStyle={style.container}>
        <VisibleGeolocation />
        <VisibleDeviceInfo />
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {}
});
