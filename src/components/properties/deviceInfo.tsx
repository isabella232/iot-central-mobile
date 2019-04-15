import React, { Component } from "react";

import DeviceInformation from "react-native-device-info";
import { NavigationProps } from "../props/NavigationProps";
import { DeviceInfoState } from "../../store/sensors/propertySensors/deviceInfo";
import _ from "lodash";
import { View, Text, StyleSheet } from "react-native";
import * as Colors from "../styling/colors";

export interface Props extends NavigationProps, DeviceInfoState {
  title: string;
  onPress: () => any;
  update: (data) => any;
  post: (data) => any;
}

export interface State {}

export default class DeviceInfoView extends Component<Props, State> {
  private subscription;

  componentDidMount() {
    this.subscribe();
  }

  subscribe = () => {
    this.subscription = setInterval(async () => {
      const data = await this._getChangedData();
      this.props.update(data);
      this.props.post(data);
    }, 5000);
  };
  unsubscribe = () => {
    navigator.geolocation.clearWatch(this.subscription);
  };

  _getChangedData = async () => {
    const newData = await _getData();
    return difference(newData, this.props.data);
  };

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <View style={style.container}>
        {Object.keys(this.props.data).map(key => {
          return (
            <this.InfoBar key={key} label={key} value={this.props.data[key]} />
          );
        })}
      </View>
    );
  }

  InfoBar = props => {
    console.log(props);
    return (
      <View style={style.infoContainer}>
        <Text style={style.labelText}>{props.label}</Text>
        <Text style={style.valueText}>{props.value}</Text>
      </View>
    );
  };
}

async function _getData() {
  const id = DeviceInformation.getDeviceId();
  const ip = await DeviceInformation.getIPAddress();
  const locale = DeviceInformation.getDeviceLocale();
  const manufacturer = DeviceInformation.getManufacturer();
  const diskAvailable = DeviceInformation.getFreeDiskStorage();
  const battery = (await DeviceInformation.getBatteryLevel()) * 100;
  const data = { id, ip, locale, manufacturer, diskAvailable, battery };
  return data;
}

function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    flexGrow: 1
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: Colors.TILE_BACKGROUND_COLOR
  },
  labelText: {
    color: Colors.TILE_TITLE_COLOR,
    fontSize: 20
  },
  valueText: {
    color: Colors.TILE_TITLE_COLOR,
    fontSize: 20
  }
});
