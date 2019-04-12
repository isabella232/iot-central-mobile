import React, { Component } from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import * as Colors from "../../styling/colors";
import IconComponent from "react-native-vector-icons/FontAwesome";
import { SensorState } from "../../../store/common/SensorDuckInterface";
import Tile from "./tile";

export interface Props {
  onPress: () => any;
  title: string;
}

export interface State {}
export default class DashboardTile extends Component<Props, State> {
  render() {
    return (
      <Tile {...this.props} subTitle={`Last sent X minutes ago`} subIcon={null}>
        {this.props.children}
      </Tile>
    );
  }
}
