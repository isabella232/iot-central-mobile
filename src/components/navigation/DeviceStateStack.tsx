import {
  createStackNavigator,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import * as Colors from "../styling/colors";
import DeviceStateDashboard from "../screens/DeviceStateDashboard";

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
    StateDashboard: DeviceStateDashboard
  },
  {
    initialRouteName: "StateDashboard",
    defaultNavigationOptions: StackNavigationStyle
  }
);
