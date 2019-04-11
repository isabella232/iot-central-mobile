import { connect } from "react-redux";
import GyroscopeTile from "../components/tiles/gyroscopeTile";
import { postTelemetry } from "../store/telemetry/telemetryduck";
import gyroscope from "../store/telemetrySensors/gyroscope";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.gyroscope,
    title: "Gyroscope"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch(gyroscope.updateData(data)),
    postTelemetry: data => dispatch(postTelemetry(transformData(data)))
  };
};

const visibleGyroscope = connect(
  mapStateToProps,
  mapDispatchToProps
)(GyroscopeTile);

export default visibleGyroscope;

function transformData(data) {
  return {
    gyroscopeX: data.x,
    gyroscopeY: data.y,
    gyroscopeZ: data.z
  };
}
