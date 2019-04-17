import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AppSwitch from "./DeviceSwitch";
import AppTabNavigator from "./AppTab";

export default createAppContainer(
  createSwitchNavigator(
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
