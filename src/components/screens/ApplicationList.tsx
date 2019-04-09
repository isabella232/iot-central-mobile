import { Component } from "react";
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";
import { getApps, Application } from "../../httpClients/IoTCentral";
import * as Colors from "../styling/colors";
import ApplicationRow from "../rows/ApplicationRow";
import { NavigationProps } from "../props/NavigationProps";
import DeviceInfo from "react-native-device-info";
import { SafeAreaView } from "react-navigation";

export interface Props extends NavigationProps {
  applications: Application[];
  isLoading: boolean;
  deviceLoading;
  getApps;
  provisionDevice;
}

export interface State {}

export default class ApplicationList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Applications"
  });

  async componentDidMount() {
    this.props.getApps();
  }

  // TODO migrate to fully managed react navigation
  handleTapped = appId => {
    this.props
      .provisionDevice(appId)
      .then(() => this.props.navigation.navigate("DeviceSensorDashboard"));
  };

  render() {
    if (
      this.props.deviceLoading ||
      (this.props.isLoading &&
        (!this.props.applications || this.props.applications.length == 0))
    ) {
      return (
        <SafeAreaView style={ListStyle.loadingContainer}>
          <ActivityIndicator size={"small"} color={"#ffffff"} />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={ListStyle.safeArea}>
          <FlatList
            style={ListStyle.container}
            data={this.props.applications}
            renderItem={({ item }) => (
              <ApplicationRow
                application={item}
                handlePressed={this.handleTapped}
              />
            )}
            refreshing={this.props.isLoading}
            onRefresh={this.props.getApps}
            keyExtractor={(item, index) => item.id}
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
    flex: 1,
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "black"
  },
  loadingContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "black"
  },
  section: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.IOTC_TEXT_COLOR
  },
  header: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: Colors.SEPARATOR_BACKGROUND_COLOR
  },
  footer: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: Colors.SEPARATOR_BACKGROUND_COLOR
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.SEPARATOR_BACKGROUND_COLOR
  },
  provisionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  }
});
