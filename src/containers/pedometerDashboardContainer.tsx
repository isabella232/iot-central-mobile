import { connect } from "react-redux";
import PedometerTile from "../components/tiles/pedometerTile";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.pedometer.data,
    isConnected: state.pedometer.send,
    interval: Math.round(state.pedometer.interval / 1000 / 60),
    title: "Pedometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const visibleMagnetometer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PedometerTile);

export default visibleMagnetometer;
