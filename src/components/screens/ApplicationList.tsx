import { Component } from "react";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Application } from "../../httpClients/IoTCentral";
import * as Colors from "../styling/colors";
import ApplicationRow from "../rows/ApplicationRow";
import { NavigationProps } from "../props/NavigationProps";
import { listStyle as style } from "../styling";
import { NavigationEvents } from "react-navigation";
export interface Props extends NavigationProps {
  applications: Application[];
  isLoading: boolean;
  getApps;
  selectedApp: string;
}

export interface State {}

export default class ApplicationList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Applications"
  });

  // TODO migrate to fully managed react navigation
  handleTapped = (app: Application) => {
    this.props.navigation.navigate("DeviceList", { app });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={() => this.props.getApps()} />
        <FlatList
          style={style.container}
          data={this.props.applications}
          renderItem={({ item }) => (
            <ApplicationRow
              application={item}
              handlePressed={this.handleTapped}
              selected={item.id === this.props.selectedApp}
            />
          )}
          refreshing={this.props.isLoading}
          onRefresh={this.props.getApps}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          ListFooterComponent={() => <View style={style.footer} />}
        />
      </View>
    );
  }
}
