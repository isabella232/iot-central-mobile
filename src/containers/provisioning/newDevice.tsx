import { connect } from "react-redux";
import NewDevice from "../../components/screens/NewDevice";
import { fetchDevices } from "../../store/deviceList";
import {
  createDevice,
  selectDevice,
  connectDeviceFirst
} from "../../store/device";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    isLoading: state.device.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    provisionDevice: (appId, deviceName) =>
      dispatch(createDevice(appId, deviceName)),
    connectDeviceFirst: (appId, deviceName) => {
      dispatch(connectDeviceFirst(appId, deviceName));
    }
  };
};

const VisibleNewDevice = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDevice);

export default VisibleNewDevice;
