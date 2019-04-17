import {
  createStackNavigator,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import SettingsContainer from "../../containers/dashboards/settingsContainer";
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
    SettingsMain: SettingsContainer
  },
  {
    initialRouteName: "SettingsMain",
    defaultNavigationOptions: StackNavigationStyle
  }
);
