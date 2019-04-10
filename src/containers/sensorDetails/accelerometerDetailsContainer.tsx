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
    shouldSend: state.accelerometer.send,
    shouldUseLargeTile: state.accelerometer.largeTile,
    shouldSimulate: state.accelerometer.simulate,
    simulatedValue: state.accelerometer.simulatedValue,
    sendFrequency: state.accelerometer.interval
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSend: value => dispatch(accelerometer.sendToCloud(value)),
    updateUseLargeTile: value => dispatch(accelerometer.useLargeTile(value)),
    updateSimulate: value => dispatch(accelerometer.simulate(value)),
    updateSimulatedValue: value =>
      dispatch(accelerometer.simulate(true, value)),
    updateSendFrequency: value => {}
  };
};

const VisibleAccelerometerDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorDetails);

export default VisibleAccelerometerDetails;
