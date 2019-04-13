import { connect } from "react-redux";
import DeviceSensorDashboard from "../components/screens/DeviceSensorDashboard";
import { subscribeAll, unsubscribeAll } from "../store/sensors";
import { update as updateSlider } from "../store/controls/slider";
import { stopSendingTelemetry } from "../store/telemetry";
import { subscribe as subscribeBackend } from "../store/backend";
const mapStateToProps = state => {
  return {
    sliderValue: state.controls.slider.data.slider
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unsubscribeAll: () => dispatch(unsubscribeAll()),
    stopSendingTelemetry: () => dispatch(stopSendingTelemetry()),
    subscribe: () => dispatch(subscribeBackend()),
    updateSlider: value => dispatch(updateSlider(value))
  };
};

const VisibleDeviceDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceSensorDashboard);

export default VisibleDeviceDashboard;
