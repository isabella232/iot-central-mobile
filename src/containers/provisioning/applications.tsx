import { connect } from "react-redux";
import ApplicationList from "../../components/screens/ApplicationList";
import { fetchApplications } from "../../store/applications";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    applications: state.applications.list,
    isLoading: state.applications.isLoading,
    selectedApp: state.device.appId
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
