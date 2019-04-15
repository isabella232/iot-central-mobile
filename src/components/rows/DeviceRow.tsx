import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Colors from "../styling/colors";
import { Application } from "../../httpClients/IoTCentral";
import IconComponent from "react-native-vector-icons/FontAwesome";

export interface Props {
  handlePressed: (device) => any;
  device: any;
}

export interface State {}

export default class DeviceRow extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.handlePressed(this.props.device)}
      >
        <View style={RowStyle.container}>
          <Text style={RowStyle.text}>{`${this.props.device.name}`}</Text>
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
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5
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
