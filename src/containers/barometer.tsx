import { connect } from "react-redux";
import ThreeAxisText from "../components/tiles/common/threeAxisText";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    pressure: state.telemetry.pressure,
    relativeAltitude: state.telemetry.relativeAltitude || 0
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const visibleBarometer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeAxisText);

export default visibleBarometer;
