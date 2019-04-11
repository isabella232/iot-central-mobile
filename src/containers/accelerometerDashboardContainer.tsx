import { connect } from "react-redux";
import AccelerometerTile from "../components/tiles/accelerometerTile";
import { postTelemetry } from "../store/telemetry/telemetryduck";
import accelerometer from "../store/telemetrySensors/accelerometer";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.accelerometer,
    title: "Accelerometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch(accelerometer.updateData(data)),
    postTelemetry: data => dispatch(postTelemetry(transformData(data)))
  };
};

const VisibleAccelerometer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccelerometerTile);

export default VisibleAccelerometer;

// transforms data to state for telemetry
function transformData(data) {
  return {
    accelerometerX: data.x,
    accelerometerY: data.y,
    accelerometerZ: data.z
  };
}
