import { connect } from "react-redux";
import { setFlashlight } from "../../store/flashlight";
import FlashlightState from "../../components/state/FlashlightState";

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.flashlight && state.flashlight.value
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFlashlight: value => dispatch(setFlashlight(value))
  };
};

const VisibleFlashlightState = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashlightState);

export default VisibleFlashlightState;
