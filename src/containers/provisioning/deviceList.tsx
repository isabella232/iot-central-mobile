import { connect } from "react-redux";
import DeviceList from "../../components/screens/DeviceList";
import { fetchDevices } from "../../store/deviceList";
import { createDevice, selectDevice } from "../../store/device";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    devices: state.deviceList.list,
    isLoading: state.deviceList.isLoading,
    selectedDevice: state.device.deviceId,
    isConnecting: state.device.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDevices: appId => dispatch(fetchDevices(appId)),
    selectDevice: device => dispatch(selectDevice(device))
  };
};

const VisibleDeviceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceList);

export default VisibleDeviceList;
