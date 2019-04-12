import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { StyleSheet, Button, SafeAreaView, View } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { updateTelemetry } from "../../backendClients/telemetry/telemetry";
import EventTile from "../tiles/common/eventTile";
import VisibleAccelerometer from "../../containers/accelerometerDashboardContainer";
import { sendEvent } from "../../store/events";
import EventTileButton from "./helpers/eventTileButton";

export interface Props extends NavigationProps {
  events: any;
  sendEvent: (event) => any;
}
export interface State {}

export default class DeviceEventDashboard extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <EventTileButton
          {...this.props}
          title="Information Event"
          event="information_button"
        />
        <EventTileButton
          {...this.props}
          title="Warning Event"
          event="warning_button"
        />
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
