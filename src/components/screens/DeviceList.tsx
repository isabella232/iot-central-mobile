import { Component } from "react";
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  TouchableOpacity
} from "react-native";
import { getApps, Application } from "../../httpClients/IoTCentral";
import * as Colors from "../styling/colors";
import ApplicationRow from "../rows/ApplicationRow";
import { NavigationProps } from "../props/NavigationProps";
import DeviceInfo from "react-native-device-info";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import DeviceRow from "../rows/DeviceRow";
import { listStyle as style } from "../styling";
import Loader from "../loading/Loader";

export interface Props extends NavigationProps {
  devices: Array<any>;
  isLoading: boolean;
  isConnecting: boolean;

  getDevices: (appId) => any;
  selectDevice;
  selectedDevice: string;
}

export interface State {
  application;
}

export default class DeviceList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const application = props.navigation.getParam("app");

    this.state = { application };
  }

  static navigationOptions = ({ navigation }) => {
    const app = navigation.getParam("app");
    const title = app ? app.name : "Devices";
    return {
      title,
      headerRight: (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate("NewDevice", {
              app
            });
          }}
        >
          <Text
            style={{ color: Colors.BUTTON, fontSize: 30, paddingRight: 10 }}
          >
            +
          </Text>
        </TouchableOpacity>
      )
    };
  };

  // TODO migrate to fully managed react navigation
  handleTapped = async device => {
    await this.props.selectDevice({
      ...device,
      appId: this.state.application.id
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={this.props.isConnecting} />
        <NavigationEvents
          onWillFocus={() => this.props.getDevices(this.state.application.id)}
        />
        <FlatList
          style={style.container}
          data={this.props.devices}
          renderItem={({ item }) => (
            <DeviceRow
              device={item}
              handlePressed={this.handleTapped}
              selected={this.props.selectedDevice === item.deviceId}
            />
          )}
          refreshing={this.props.isLoading}
          onRefresh={() => this.props.getDevices(this.state.application.id)}
          keyExtractor={(item, index) => item.deviceId}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          ListFooterComponent={() => <View style={style.footer} />}
        />
      </View>
    );
  }
}
