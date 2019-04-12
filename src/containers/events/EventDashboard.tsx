import { connect } from "react-redux";
import { postTelemetry } from "../../store/telemetry/telemetryduck";
import { sendEvent } from "../../store/events";
import DeviceEventDashboard from "../../components/screens/DeviceEventsDashboard";
const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendEvent: data => dispatch(sendEvent(data))
  };
};

const VisibleEventDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceEventDashboard);

export default VisibleEventDashboard;
