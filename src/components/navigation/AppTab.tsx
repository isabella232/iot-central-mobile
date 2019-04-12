import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import DeviceDashboardContainer from "../../containers/deviceDashboard";
import * as Colors from "../styling/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicon from "react-native-vector-icons/Octicons";
import SelfProvisioningStack from "./SelfProvisioningStack";
import DashboardTab from "./DashboardTab";
import SettingsStack from "./SettingsStack";
import DashboardStack from "./DashboardStack";
import DeviceEventDashboard from "../screens/DeviceEventsDashboard";
import EventStack from "./EventStack";

const AppTabNavigator = createBottomTabNavigator(
  {
    Dashboard: DashboardStack,
    Events: EventStack,
    Connect: SelfProvisioningStack,
    Settings: SettingsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = FontAwesome;
        let iconName;
        if (routeName === "Dashboard") {
          iconName = "dashboard";
        } else if (routeName === "Connect") {
          iconName = "feed";
        } else if (routeName === "Settings") {
          iconName = "gear";
        } else if (routeName === "Events") {
          return <Octicon name="flame" size={25} color={tintColor} />;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeBackgroundColor: Colors.IOTC_BACKGROUND_COLOR,
      inactiveBackgroundColor: Colors.IOTC_BACKGROUND_COLOR,
      activeTintColor: Colors.IOTC_TEXT_COLOR,
      inactiveTintColor: Colors.IOTC_SUB_TEXT_COLOR,
      showLabel: true,
      tabStyle: {
        backgroundColor: Colors.IOTC_BACKGROUND_COLOR
      },
      style: {
        backgroundColor: Colors.IOTC_BACKGROUND_COLOR
      }
    }
  }
);

export default AppTabNavigator;
