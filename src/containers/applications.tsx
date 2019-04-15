import { connect } from "react-redux";
import ApplicationList from "../components/screens/ApplicationList";
import { fetchApplications } from "../store/applications";
import { createDevice } from "../store/devices";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    applications: state.applications.list,
    isLoading: state.applications.isLoading,
    deviceLoading: state.devices.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApps: () => dispatch(fetchApplications())
    // provisionDevice: appId => dispatch(createDevice(appId))
  };
};

const VisibleApplicationList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationList);

export default VisibleApplicationList;
