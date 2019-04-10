import { connect } from "react-redux";
import ThreeAxisText from "../components/tiles/common/threeAxisText";
import Level from "../components/sensorVisualization/level";
import ThreeAxisDashboard from "../components/sensorVisualization/ThreeAxisDashboard";
import AccelerometerTile from "../components/tiles/accelerometerTile";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    x: state.accelerometer.data.accelerometerX,
    y: state.accelerometer.data.accelerometerY,
    z: state.accelerometer.data.accelerometerZ,
    isConnected: state.accelerometer.send,
    interval: Math.round(state.accelerometer.interval / 1000 / 60),
    title: "Accelerometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch({ type: "aziot/accelerometer/UPDATE", data })
  };
};

const VisibleAccelerometer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccelerometerTile);

export default VisibleAccelerometer;
