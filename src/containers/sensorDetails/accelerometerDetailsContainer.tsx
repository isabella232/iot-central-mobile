import { connect } from "react-redux";
import SensorDetails from "../../components/screens/SensorDetails";
import accelerometer from "../../store/telemetrySensors/accelerometer";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    send: state.accelerometer.send,
    largeTile: state.accelerometer.largeTile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendToCloud: value => dispatch(accelerometer.sendToCloud(value)),
    useLargeTile: value => dispatch(accelerometer.useLargeTile(value))
  };
};

const VisibleAccelerometerDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorDetails);

export default VisibleAccelerometerDetails;
