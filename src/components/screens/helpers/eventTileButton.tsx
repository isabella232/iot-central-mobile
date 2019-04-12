import React, { Component } from "react";
import { NavigationProps } from "../../props/NavigationProps";
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import EventTile from "../../tiles/common/eventTile";
import * as Colors from "../../styling/colors";

export interface Props extends NavigationProps {
  event: any;
  sendEvent: (event) => any;
  eventName: string;
  title: string;
  buttonColor?: string;
}
export interface State {}

// TODO: centralize styling
export default class EventTileButton extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <EventTile {...this.props} title={this.props.title} onPress={() => {}}>
          <Text style={{ color: Colors.TILE_TITLE_COLOR, fontSize: 18 }}>
            {this.props.event ? this.props.event.value : "No Value Defined"}
          </Text>
        </EventTile>
        <TouchableOpacity
          style={{
            backgroundColor: this.props.buttonColor || Colors.BUTTON,
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
            elevation: 5,
            flex: 1
          }}
          onPress={() =>
            this.props.sendEvent({
              name: this.props.eventName,
              value: this.props.event
                ? this.props.event.value
                : "No Value Defined"
            })
          }
        >
          <Text style={{ color: Colors.BUTTON_TEXT, fontSize: 20 }}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start"
  }
});
