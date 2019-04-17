import { connect } from "react-redux";
import DeviceSensorDashboard from "../../components/screens/DeviceSensorDashboard";
import {
  subscribe as subscribeBackend,
  unsubscribe as unsubscribeBackend
} from "../../store/backend";
const mapStateToProps = state => {
  return {
    sliderValue: state.controls.slider.data.slider
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unsubscribe: () => dispatch(unsubscribeBackend()),
    subscribe: () => dispatch(subscribeBackend())
  };
};

const VisibleDeviceDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceSensorDashboard);

export default VisibleDeviceDashboard;
