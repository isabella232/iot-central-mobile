import { connect } from "react-redux";
import SettingsScreen from "../components/screens/SettingsScreen";
import { fetchApplications } from "../store/applications/applicationsduck";
import { createDevice } from "../store/devices/devicesduck";
import LoginManager from "../auth/AdalManager";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logout: LoginManager.logout
  };
};

const VisibleApplicationList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);

export default VisibleApplicationList;
