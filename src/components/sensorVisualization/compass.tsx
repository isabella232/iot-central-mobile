/*
Reference https://github.com/rahulhaque/compass-react-native-non-expo
MIT License

Copyright (c) 2018 rahulhaque

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";

export interface Props {
  height: number;
  width: number;
  x: number;
  y: number;
  z: number;
}
export interface State {
  magnetometer: number;
}
export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      magnetometer: 0
    };
  }

  _angle = () => {
    let { x, y, z } = { ...this.props };
    let angle;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }

    return angle; //Math.round(angle);
  };

  _direction = degree => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  _degree = magnetometer => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  render() {
    return (
      <View style={{ ...style.parentContainer }}>
        <Image
          source={require("../../../assets/images/compass_pointer.png")}
          style={{
            height: this.props.height / 4,
            resizeMode: "contain"
          }}
        />
        <ImageBackground
          source={require("../../../assets/images/compass_bg.png")}
          style={{
            width: this.props.width,
            height: this.props.height,
            resizeMode: "contain",
            transform: [{ rotate: 360 - this._angle() + "deg" }]
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ rotate: -(360 - this._angle()) + "deg" }]
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {this._direction(this._degree(this._angle()))}
            </Text>
            <Text
              style={{
                color: "#fff",
                textAlign: "center"
              }}
            >
              {this._degree(Math.round(this._angle()))}°
            </Text>
          </View>
        </ImageBackground>
      </View>

      /*
      <Grid style={{ backgroundColor: "black" }}>
        <Row style={{ alignItems: "center" }} size={0.9}>
          <Col style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: this.props.height / 26,
                fontWeight: "bold"
              }}
            >
              {this._direction(this._degree(this._angle()))}
            </Text>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={0.1}>
          <Col style={{ alignItems: "center" }}>
            <View
              style={{
                position: "absolute",
                width: width,
                alignItems: "center",
                top: 0
              }}
            >
              <Image
                source={require("../../../assets/images/compass_pointer.png")}
                style={{
                  height: this.props.height / 26,
                  resizeMode: "contain"
                }}
              />
            </View>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={2}>
          <Text
            style={{
              color: "#fff",
              fontSize: this.props.height / 27,
              width: width,
              position: "absolute",
              textAlign: "center"
            }}
          >
            {this._degree(Math.round(this._angle()))}°
          </Text>

          <Col style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/images/compass_bg.png")}
              style={{
                height: this.props.width,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                transform: [{ rotate: 360 - this._angle() + "deg" }]
              }}
            />
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={1}>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff" }} />
          </Col>
        </Row>
      </Grid>
      */
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
