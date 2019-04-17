import { connect } from "react-redux";
import DeviceSensorDashboard from "../../components/screens/DeviceSensorDashboard";
import {
  subscribe as subscribeBackend,
  unsubscribe as unsubscribeBackend
} from "../../store/backend";
import { subscribeAll, unsubscribeAll } from "../../store/sensors";
const mapStateToProps = state => {
  return {
    sliderValue: state.controls.slider.data.slider
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unsubscribe: () => dispatch(unsubscribeBackend()),
    subscribe: () => dispatch(subscribeBackend()),
    subscribeSensors: () => dispatch(subscribeAll()),
    unsubscribeSensors: () => dispatch(unsubscribeAll())
  };
};

const VisibleDeviceDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceSensorDashboard);

export default VisibleDeviceDashboard;
