import React, { Component } from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import * as Colors from "../../styling/colors";
import { Grid, Col, Row } from "react-native-easy-grid";
import IconComponent from "react-native-vector-icons/FontAwesome";

export interface Props {
  onPress: () => any;
  title: string;
  isConnected: boolean;
  interval: number;
}

export interface State {}
export default class DashboardTile extends Component<Props, State> {
  render() {
    return (
      <View style={style.container}>
        <TouchableHighlight
          underlayColor={Colors.TILE_PRESSED_COLOR}
          style={style.button}
          onPress={this.props.onPress}
        >
          <Grid style={style.content}>
            <Row size={10}>
              <View style={style.headerContainer}>
                <Text style={style.title}>{this.props.title}</Text>
                <View style={style.iconContainer}>
                  <IconComponent
                    name="angle-right"
                    size={20}
                    color={Colors.TILE_ACTIVE_COLOR}
                  />
                </View>
              </View>
            </Row>
            <Row size={80}>
              <Col style={style.content}>{this.props.children}</Col>
            </Row>
            <Row size={10}>
              <View style={style.headerContainer}>
                <Text style={style.subTitle}>{`Every ${
                  this.props.interval
                } minutes`}</Text>
                <View style={style.iconContainer}>
                  <IconComponent
                    name="signal"
                    size={20}
                    // TODO link to real data
                    color={
                      this.props.isConnected
                        ? Colors.TILE_ACTIVE_COLOR
                        : Colors.TILE_INACTIVE_COLOR
                    }
                  />
                </View>
              </View>
            </Row>
          </Grid>
        </TouchableHighlight>
      </View>
    );
  }
}

// ANDROID: add 'elevation' prop for android shadow
const style = StyleSheet.create({
  button: {
    backgroundColor: Colors.TILE_BACKGROUND_COLOR,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5,
    flex: 1
  },
  content: {
    flex: 1,
    padding: 10
  },
  container: {
    flex: 1,
    padding: 8
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  iconContainer: {
    flex: 1,
    // alignItems: "fl",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row-reverse"
  },
  title: {
    textTransform: "uppercase",
    color: Colors.TILE_TITLE_COLOR,
    paddingRight: 10
  },
  subTitle: {
    textTransform: "uppercase",
    color: Colors.TILE_SUB_TEXT_COLOR
  }
});
