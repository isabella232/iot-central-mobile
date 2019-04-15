import { connect } from "react-redux";
import DeviceList from "../../components/screens/DeviceList";
import { fetchDevices } from "../../store/deviceList";
import { createDevice, selectDevice } from "../../store/devices";
// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    devices: state.deviceList.list,
    isLoading: state.deviceList.isLoading,
    deviceLoading: state.devices.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDevices: appId => dispatch(fetchDevices(appId)),
    provisionDevice: appId => dispatch(createDevice(appId)),
    selectDevice: device => dispatch(selectDevice(device))
  };
};

const VisibleDeviceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceList);

export default VisibleDeviceList;
