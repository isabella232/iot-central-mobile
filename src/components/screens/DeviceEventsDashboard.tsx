import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { StyleSheet, Button, SafeAreaView, View } from "react-native";
import EventTileButton from "./helpers/eventTileButton";
import { ScrollView } from "react-native-gesture-handler";

export interface Props extends NavigationProps {
  events: any;
  sendEvent: (event) => any;
  updateEvent: (event, value) => any;
}
export interface State {}

export default class DeviceEventDashboard extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <ScrollView>
          <EventTileButton
            {...this.props}
            title="Information Event"
            eventName="information_button"
            event={this.props.events.information_button}
          />
          <EventTileButton
            {...this.props}
            title="Warning Event"
            eventName="warning_button"
            event={this.props.events.warning_button}
          />
          <EventTileButton
            {...this.props}
            title="Error Event"
            eventName="error_button"
            event={this.props.events.error_button}
          />
        </ScrollView>
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
