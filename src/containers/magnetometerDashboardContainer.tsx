import { connect } from "react-redux";
import MagnetometerTile from "../components/tiles/magnetometerTile";
import { postTelemetry } from "../store/telemetry/telemetryduck";
import magnetometer from "../store/telemetrySensors/magnetometer";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.magnetometer,
    title: "Magnetometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch(magnetometer.updateData(data)),
    postTelemetry: data => dispatch(postTelemetry(transformData(data)))
  };
};

const visibleMagnetometer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MagnetometerTile);

export default visibleMagnetometer;

// TODO: add "Post" method to each reducer, move logic there
function transformData(data) {
  return {
    magnetometerX: data.x,
    magnetometerY: data.y,
    magnetometerZ: data.z
  };
}
