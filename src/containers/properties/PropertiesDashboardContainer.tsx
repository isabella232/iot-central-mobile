import { connect } from "react-redux";
import { sendEvent, updateEvent } from "../../store/events";
import DevicePropertiesDashboard from "../../components/screens/DevicePropertiesDashboard";

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const VisiblePropertiesDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicePropertiesDashboard);

export default VisiblePropertiesDashboard;
