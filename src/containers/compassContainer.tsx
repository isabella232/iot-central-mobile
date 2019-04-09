import { connect } from "react-redux";
import Compass from "../components/sensorVisualization/compass";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    x: state.magnetometer.data.magnetometerX,
    y: state.magnetometer.data.magnetometerY,
    z: state.magnetometer.data.magnetometerZ,
    title: "Magnetometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const visibleCompass = connect(
  mapStateToProps,
  mapDispatchToProps
)(Compass);

export default visibleCompass;
