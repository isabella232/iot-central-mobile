import { connect } from "react-redux";
import ThreeAxisDashboard from "../components/sensorVisualization/ThreeAxisDashboard";
import MagnetometerTile from "../components/tiles/magnetometerTile";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.magnetometer.data,
    isConnected: state.magnetometer.send,
    interval: Math.round(state.magnetometer.interval / 1000 / 60),
    title: "Magnetometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch({ type: "aziot/magnetometer/UPDATE", data })
  };
};

const visibleMagnetometer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MagnetometerTile);

export default visibleMagnetometer;
