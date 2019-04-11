/*


DEPRECATED


*/

import React, { Component } from "react";
import {
  createMaterialTopTabNavigator,
  TabBarTop,
  SafeAreaView,
  //@ts-ignore
  MaterialTopTabBar
} from "react-navigation";
import * as Colors from "../styling/colors";
import DeviceDashboardContainer from "../../containers/deviceDashboard";

const DashboardTabNavigator = createMaterialTopTabNavigator(
  {
    Telemetry: DeviceDashboardContainer
    // SecondTelemetry: DeviceDashboardContainer
  },
  {
    initialRouteName: "Telemetry",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.IOTC_BACKGROUND_COLOR // this will handle the cutOff at the top the screen
      }
      /*
      headerTitleStyle: {
        fontSize: 14,
        fontWeight: "800",
        textAlign: "center",
        flex: 1 // to make a header centered to the screen
      }*/
    },
    tabBarComponent: SafeAreaMaterialTopTabBar,
    tabBarOptions: {
      activeTintColor: Colors.IOTC_TEXT_COLOR,
      inactiveTintColor: Colors.IOTC_SUB_TEXT_COLOR,
      style: {
        backgroundColor: Colors.IOTC_BACKGROUND_COLOR
      },
      indicatorStyle: {
        backgroundColor: Colors.IOTC_TEXT_COLOR
      }
    }
  }
);

function SafeAreaMaterialTopTabBar(props) {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.IOTC_BACKGROUND_COLOR }}>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
}

export default DashboardTabNavigator;
