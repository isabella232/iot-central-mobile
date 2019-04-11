import {
  createStackNavigator,
  createBottomTabNavigator,
  StackNavigatorConfig,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import DeviceDashboardContainer from "../../containers/deviceDashboard";
import * as Colors from "../styling/colors";
import AccelerometerDetails from "../../containers/sensorDetails/accelerometerDetailsContainer";
import MagnetometerDetails from "../../containers/sensorDetails/magnetometerDetailsContainer";
import GyroscopeDetails from "../../containers/sensorDetails/gyroscopeDetailsContainer";

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
    AccelerometerDetails,
    MagnetometerDetails,
    GyroscopeDetails
  },
  {
    initialRouteName: "Dashboard",
    defaultNavigationOptions: StackNavigationStyle
  }
);
