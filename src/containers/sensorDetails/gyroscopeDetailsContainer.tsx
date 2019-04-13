import { connect } from "react-redux";
import SensorDetails from "../../components/tileDetails/GyroscopeDetails";
import sensor from "../../store/sensors/telemetrySensors/gyroscope";

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
    ...state.gyroscope
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
