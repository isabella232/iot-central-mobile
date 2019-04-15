import {
  createStackNavigator,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import * as Colors from "../styling/colors";
import VisiblePropertiesDashboard from "../../containers/properties/PropertiesDashboardContainer";

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
    PropertiesDashboard: VisiblePropertiesDashboard
  },
  {
    initialRouteName: "PropertiesDashboard",
    defaultNavigationOptions: StackNavigationStyle
  }
);
