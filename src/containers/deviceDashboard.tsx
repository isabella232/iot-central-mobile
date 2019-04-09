import { connect } from "react-redux";
import DeviceSensorDashboard from "../components/screens/DeviceSensorDashboard";
import { subscribeAll, unsubscribeAll } from "../store/sensors/sensors";
import { update as updateSlider } from "../store/controls/sliderduck";
import {
  postTelemetryOnInterval,
  stopSendingTelemetry
} from "../store/telemetry/telemetryduck";
import { subscribe as subscribeBackend } from "../store/backend/backendduck";
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
