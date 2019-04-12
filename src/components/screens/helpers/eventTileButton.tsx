import React, { Component } from "react";
import { NavigationProps } from "../../props/NavigationProps";
import { StyleSheet, Button, SafeAreaView, View } from "react-native";
import EventTile from "../../tiles/common/eventTile";

export interface Props extends NavigationProps {
  events: any;
  sendEvent: (event) => any;
  event: string;
  title: string;
}
export interface State {}

export default class EventTileButton extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <EventTile
          event={this.props.events[this.props.event]}
          title={this.props.title}
          onPress={() => {}}
        />
        <Button
          onPress={() =>
            this.props.sendEvent({
              name: this.props.event,
              value: "Information Event"
            })
          }
          title={"send"}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
