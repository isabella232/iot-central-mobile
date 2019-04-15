import { connect } from "react-redux";
import PedometerTile from "../components/tiles/pedometerTile";
import pedometer from "../store/sensors/telemetrySensors/pedometer";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.pedometer,
    title: "Pedometer"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch(pedometer.updateData(data))
  };
};

const visibleMagnetometer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PedometerTile);

export default visibleMagnetometer;
