import { connect } from "react-redux";
import Level from "../../components/sensorVisualization/level";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    x: state.accelerometer.data.accelerometerX,
    y: state.accelerometer.data.accelerometerY,
    z: state.accelerometer.data.accelerometerZ,
    title: "Accelerometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const visibleLevel = connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);

export default visibleLevel;
