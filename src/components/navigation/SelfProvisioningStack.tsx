import {
  createStackNavigator,
  createBottomTabNavigator,
  StackNavigatorConfig,
  NavigationScreenConfig,
  NavigationScreenOptions
} from "react-navigation";
import ApplicationContainer from "../../containers/provisioning/applications";
import * as Colors from "../styling/colors";
import VisibleDeviceList from "../../containers/provisioning/deviceList";
import VisibleNewDevice from "../../containers/provisioning/newDevice";

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
    ApplicationList: ApplicationContainer,
    DeviceList: VisibleDeviceList,
    NewDevice: VisibleNewDevice
  },
  {
    initialRouteName: "ApplicationList",
    defaultNavigationOptions: StackNavigationStyle
  }
);
