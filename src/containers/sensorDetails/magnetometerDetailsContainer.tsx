import { connect } from "react-redux";
import SensorDetails from "../../components/tileDetails/MagnetometerDetails";
import sensor from "../../store/sensors/telemetrySensors/magnetometer";

// TODO: refactor state to contain original format, transform before sending to backend
/*
shouldSend: boolean;
  shouldUseLargeTile: boolean;
  shouldSimulate: boolean;
  simulatedValue: { x: number; y: number; z: number };
  sendFrequency: number;
  updateSend: (send: boolean) => any;
  updateUseLargeTile: (use: boolean) => any;
  updateSimulate: (simulate: boolean) => any;
  updateSimulatedValue: (value: any) => any;
  updateSendFrequency: (value: number) => any;*/
const mapStateToProps = state => {
  return {
    ...state.magnetometer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSend: value => dispatch(sensor.updateSend(value)),
    updateUseLargeTile: value => dispatch(sensor.updateUseLargeTile(value)),
    updateSimulate: value => dispatch(sensor.updateSimulate(value)),
    updateSimulatedValue: value => dispatch(sensor.updateSimulatedValue(value)),
    updateSendFrequency: value => dispatch(sensor.updateSendFrequency(value))
  };
};

const VisibleAccelerometerDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorDetails);

export default VisibleAccelerometerDetails;
