import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AppSwitch from "./DeviceSwitch";
import AppTabNavigator from "./AppTab";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";

export default createAppContainer(
  createAnimatedSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppTabNavigator,
      Auth: LoginScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
