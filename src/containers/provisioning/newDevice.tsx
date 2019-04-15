import { connect } from "react-redux";
import NewDevice from "../../components/screens/NewDevice";
import { fetchDevices } from "../../store/deviceList";
import { createDevice, selectDevice } from "../../store/devices";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    isLoading: state.devices.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    provisionDevice: (appId, deviceName) =>
      dispatch(createDevice(appId, deviceName))
  };
};

const VisibleNewDevice = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDevice);

export default VisibleNewDevice;
