import {
  createStackNavigator,
  createBottomTabNavigator,
  StackNavigatorConfig,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import DeviceDashboardContainer from "../../containers/deviceDashboard";
import * as Colors from "../styling/colors";
import VisibleAccelerometerDetails from "../../containers/sensorDetails/accelerometerDetailsContainer";

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
    Dashboard: DeviceDashboardContainer,
    AccelerometerDetails: VisibleAccelerometerDetails
  },
  {
    initialRouteName: "Dashboard",
    defaultNavigationOptions: StackNavigationStyle
  }
);
