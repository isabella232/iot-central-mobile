import { connect } from "react-redux";
import SensorDetails from "../../components/tileDetails/AccelerometerDetails";
import accelerometer from "../../store/telemetrySensors/accelerometer";

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
    ...state.accelerometer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSend: value => dispatch(accelerometer.updateSend(value)),
    updateUseLargeTile: value =>
      dispatch(accelerometer.updateUseLargeTile(value)),
    updateSimulate: value => dispatch(accelerometer.updateSimulate(value)),
    updateSimulatedValue: value =>
      dispatch(accelerometer.updateSimulatedValue(value)),
    updateSendFrequency: value =>
      dispatch(accelerometer.updateSendFrequency(value))
  };
};

const VisibleAccelerometerDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorDetails);

export default VisibleAccelerometerDetails;
