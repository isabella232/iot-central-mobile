import { connect } from "react-redux";
import GyroscopeTile from "../components/tiles/gyroscopeTile";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.gyroscope.data,
    isConnected: state.gyroscope.send,
    interval: Math.round(state.gyroscope.interval / 1000 / 60),
    title: "Gyroscope"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch({ type: "aziot/gyroscope/UPDATE", data })
  };
};

const visibleGyroscope = connect(
  mapStateToProps,
  mapDispatchToProps
)(GyroscopeTile);

export default visibleGyroscope;
