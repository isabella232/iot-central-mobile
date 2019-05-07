import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({
  name: "AzIoTMobile",
  host: "10.69.24.125"
}) // controls connection & communication settings
  .use(reactotronRedux());
//.useReactNative({
//  asyncStorage: false
//}) // add all built-in react native plugins; // let's connect!

if (__DEV__) {
  reactotron.connect();
}
export default reactotron;
