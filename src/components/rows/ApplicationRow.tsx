import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Colors from "../styling/colors";
import { Application } from "../../httpClients/IoTCentral";
import IconComponent from "react-native-vector-icons/FontAwesome";

export interface Props {
  handlePressed: (app: Application) => any;
  application: Application;
  selected: boolean;
}

export interface State {}

export default class ApplicationRow extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.handlePressed(this.props.application)}
      >
        <View style={{ ...RowStyle.container }}>
          <Text
            style={{
              ...RowStyle.text,
              color: this.props.selected
                ? Colors.TILE_ACTIVE_COLOR
                : Colors.TILE_TITLE_COLOR
            }}
          >{`${this.props.application.name}`}</Text>
          <IconComponent
            name="angle-right"
            size={20}
            color={Colors.TILE_ACTIVE_COLOR}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const RowStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.TILE_BACKGROUND_COLOR,
    shadowColor: Colors.SHADOW_COLOR
  },
  text: {
    marginLeft: 0,
    fontSize: 20,
    color: Colors.TILE_TITLE_COLOR
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});
