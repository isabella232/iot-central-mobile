import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SelfProvisioningStack from "./SelfProvisioningStack";
import App from "./AppTab";

import VisibleAppLoading from "../../containers/subscriptions/subscriptionContainer";
import AppLoading from "../screens/AppLoading";

export default createAppContainer(
  createSwitchNavigator(
    {
      AppLoading: VisibleAppLoading,
      App: App,
      SelectDevice: SelfProvisioningStack
    },
    {
      initialRouteName: "AppLoading"
    }
  )
);
