import { connect } from "react-redux";
import AccelerometerTile from "../components/tiles/accelerometerTile";
import { postTelemetry } from "../store/telemetry/telemetryduck";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.accelerometer.data,
    isConnected: state.accelerometer.send,
    interval: state.accelerometer.interval,
    title: "Accelerometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch({ type: "aziot/accelerometer/UPDATE", data }),
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
