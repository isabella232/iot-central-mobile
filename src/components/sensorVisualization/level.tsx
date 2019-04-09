import React, { Component } from "react";
import { Image, View, Text, Dimensions, StyleSheet } from "react-native";
import { pitch, roll } from "./helpers/angles";
import * as Colors from "../styling/colors";
import { transform } from "@babel/core";

export interface Props {
  perspective: number;
  x: number;
  y: number;
  z: number;
}

export interface State {}

export default class Level extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ ...style.container, ...this.transform() }}>
        {this.props.children}
      </View>

      /*<View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "red",
            ...this.transform()
          }}
        />*/
    );
  }

  transform = () => {
    return {
      transform: [
        { perspective: this.props.perspective },
        { rotateX: `${roll(this.props)}rad` },
        { rotateY: `${pitch(this.props)}rad` }
      ]
    };
  };
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
