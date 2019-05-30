import { Component } from "react";
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  TouchableHighlight
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

  deleteDevice: (appId: string, deviceId: string) => any;
  disconnectDevice: (appId: string, deviceId: string) => any;
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

  _listEmptyButton = () => {
    if (this.props.isLoading) {
      return null;
    }
    return (
      <View style={emptyStyle.container}>
        <TouchableHighlight
          style={{
            ...emptyStyle.button
          }}
          onPress={async () => {
            this.props.navigation.navigate("NewDevice", {
              app: this.state.application
            });
          }}
        >
          <Text style={emptyStyle.text}>+</Text>
        </TouchableHighlight>
      </View>
    );
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
          ListEmptyComponent={this._listEmptyButton}
          renderItem={({ item }) => (
            <DeviceRow
              device={item}
              handlePressed={this.handleTapped}
              selected={this.props.selectedDevice === item.deviceId}
              deleteDevice={device =>
                this.props.deleteDevice(this.state.application.id, device.id)
              }
              disconnectDevice={device => {
                this.props.disconnectDevice(
                  this.state.application.id,
                  device.id
                );
              }}
            />
          )}
          refreshing={this.props.isLoading && !this.props.isConnecting}
          onRefresh={() => this.props.getDevices(this.state.application.id)}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          ListFooterComponent={() => <View style={style.footer} />}
        />
      </View>
    );
  }
}

const emptyStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%"
  },
  text: {
    color: Colors.BUTTON_TEXT,
    fontSize: 70
  },
  button: {
    backgroundColor: Colors.BUTTON,
    //shadowColor: Colors.SHADOW_COLOR,
    //shadowOpacity: 0.5,
    //shadowOffset: { width: 0, height: 5 },
    //shadowRadius: 3,
    //selevation: 5,
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around"
  }
});
