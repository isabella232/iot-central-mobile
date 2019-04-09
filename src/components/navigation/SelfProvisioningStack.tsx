import {
  createStackNavigator,
  createBottomTabNavigator,
  StackNavigatorConfig,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import ApplicationContainer from "../../containers/applications";
import DeviceDashboardContainer from "../../containers/deviceDashboard";
import * as Colors from "../styling/colors";

const StackNavigationStyle: NavigationScreenConfig<NavigationScreenOptions> = {
  headerStyle: {
    backgroundColor: Colors.IOTC_BACKGROUND_COLOR
  },
  headerTintColor: "#ffffff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};
export default createStackNavigator(
  {
    ApplicationList: ApplicationContainer
  },
  {
    initialRouteName: "ApplicationList",
    defaultNavigationOptions: StackNavigationStyle
  }
);
