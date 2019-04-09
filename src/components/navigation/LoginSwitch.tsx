import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import SelfProvisioningStack from "./SelfProvisioningStack";
import App from "./AppTab";

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: App,
      Auth: LoginScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
