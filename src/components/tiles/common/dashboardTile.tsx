import React, { Component } from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import * as Colors from "../../styling/colors";
import IconComponent from "react-native-vector-icons/FontAwesome";
import { SensorState } from "../../../store/sensors/common/SensorDuckInterface";
import Tile from "./tile";

export interface Props extends SensorState<any> {
  onPress: () => any;
  title: string;
}

export interface State {}
export default class DashboardTile extends Component<Props, State> {
  render() {
    return (
      <Tile
        {...this.props}
        wide={this.props.shouldUseLargeTile}
        subTitle={`Every ${Math.round(
          this.props.sendInterval / 1000 / 60
        )} minutes`}
        subIcon={
          <IconComponent
            name="signal"
            size={20}
            // TODO link to real data
            color={
              this.props.shouldSend
                ? Colors.TILE_ACTIVE_COLOR
                : Colors.TILE_INACTIVE_COLOR
            }
          />
        }
      >
        {this.props.children}
      </Tile>
    );
  }
}
