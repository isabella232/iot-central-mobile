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
import { SafeAreaView } from "react-navigation";
import DeviceRow from "../rows/DeviceRow";

export interface Props extends NavigationProps {
  devices: Array<any>;
  isLoading: boolean;
  deviceLoading;
  getDevices: (appId) => any;
  provisionDevice;
  selectDevice;
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

  async componentDidMount() {
    this.props.getDevices(this.state.application.id);
  }

  // TODO migrate to fully managed react navigation
  handleTapped = async device => {
    await this.props.selectDevice({
      ...device,
      appId: this.state.application.id
    });
    this.props.navigation.navigate("Dashboard");
  };

  render() {
    if (
      this.props.deviceLoading ||
      (this.props.isLoading &&
        (!this.props.devices || this.props.devices.length == 0))
    ) {
      return (
        <SafeAreaView style={ListStyle.loadingContainer}>
          <ActivityIndicator size={"small"} />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={ListStyle.safeArea}>
          <FlatList
            style={ListStyle.container}
            data={this.props.devices}
            renderItem={({ item }) => (
              <DeviceRow device={item} handlePressed={this.handleTapped} />
            )}
            refreshing={this.props.isLoading}
            onRefresh={() => this.props.getDevices(this.state.application.id)}
            keyExtractor={(item, index) => item.deviceId}
            ItemSeparatorComponent={() => <View style={ListStyle.separator} />}
            ListFooterComponent={() => <View style={ListStyle.footer} />}
          />
        </SafeAreaView>
      );
    }
  }
}

const ListStyle = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: 8
    //paddingRight: 10
  },
  loadingContainer: {
    flex: 1,
    padding: 10
  },
  section: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.TILE_TITLE_COLOR
  },
  header: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2
  },
  footer: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 30
  },
  provisionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  buttonContainer: {
    flex: 1
  }
});
