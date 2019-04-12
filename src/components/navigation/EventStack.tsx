import {
  createStackNavigator,
  createBottomTabNavigator,
  StackNavigatorConfig,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import * as Colors from "../styling/colors";
import VisibleEventDashboard from "../../containers/events/EventDashboard";

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
    EventDashboard: VisibleEventDashboard
  },
  {
    initialRouteName: "EventDashboard",
    defaultNavigationOptions: StackNavigationStyle
  }
);
