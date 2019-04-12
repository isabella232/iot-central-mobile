import { connect } from "react-redux";
import { postTelemetry } from "../../store/telemetry/telemetryduck";
import { sendEvent, updateEvent } from "../../store/events";
import DeviceEventDashboard from "../../components/screens/DeviceEventsDashboard";
const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendEvent: data => dispatch(sendEvent(data)),
    updateEvent: (event, value) => dispatch(updateEvent(event, value))
  };
};

const VisibleEventDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceEventDashboard);

export default VisibleEventDashboard;
