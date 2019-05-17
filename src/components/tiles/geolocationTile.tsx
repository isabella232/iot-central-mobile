import React, { Component } from "react";
import Tile from "./common/tile";
import { NavigationProps } from "../props/NavigationProps";
import IconComponent from "react-native-vector-icons/FontAwesome";
import * as Colors from "../styling/colors";
import moment from "moment";
import MapView from "react-native-maps";
import { SensorState } from "../../store/sensors/common/SensorDuckInterface";
import { GeolocationState } from "../../store/sensors/propertySensors/geolocation";
import KeyValueText from "./common/keyValueText";
import { View } from "react-native";

export interface Props extends NavigationProps, GeolocationState {
  title: string;
  onPress: () => any;
  update: (data) => any;
  post: (data) => any;
}

export interface State {}

export default class GeolocationTile extends Component<Props, State> {
  private geolocationSubscription;

  render() {
    const Child = this.props.shouldUseLargeTile ? Map : Map;
    return (
      <Tile
        {...this.props}
        subTitle={
          this.props.data && this.props.data.timestamp
            ? `Last sent ${moment(this.props.data.timestamp).fromNow()}`
            : "Not sent yet"
        }
        wide={this.props.shouldUseLargeTile}
        style={{
          padding: 0,
          paddingTop: 10,
          paddingBottom: 20,
          flexGrow: 1,
          flexShrink: 0
        }}
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
        <Child {...this.props} />
      </Tile>
    );
  }
}

function KeyValue(props) {
  return (
    <View>
      <KeyValueText
        title="latitude"
        value={Math.round(props.data.coords.latitude)}
      />
      <KeyValueText
        title="longitude"
        value={Math.round(props.data.coords.longitude)}
      />
    </View>
  );
}

function Map(props) {
  return (
    <MapView
      style={{ flexGrow: 1, alignSelf: "stretch" }}
      region={{
        latitude: props.data.coords.latitude,
        longitude: props.data.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      showsUserLocation={true}
    />
  );
}

function transformData(position) {
  return {
    location: {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  };
}
