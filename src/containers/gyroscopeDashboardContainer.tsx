import { connect } from "react-redux";
import GyroscopeTile from "../components/tiles/gyroscopeTile";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    x: state.gyroscope.data.gyroscopeX,
    y: state.gyroscope.data.gyroscopeY,
    z: state.gyroscope.data.gyroscopeZ,
    isConnected: state.gyroscope.send,
    interval: Math.round(state.gyroscope.interval / 1000 / 60),
    title: "Gyroscope"
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const visibleGyroscope = connect(
  mapStateToProps,
  mapDispatchToProps
)(GyroscopeTile);

export default visibleGyroscope;
