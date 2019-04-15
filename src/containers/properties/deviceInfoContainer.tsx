import { connect } from "react-redux";
import { postProperties } from "../../store/properties/reportedduck";
import deviceInfo from "../../store/sensors/propertySensors/deviceInfo";
import DeviceInfoView from "../../components/properties/deviceInfo";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.deviceInfo,
    title: "DeviceInfo"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch(deviceInfo.updateData(data)),
    post: data => dispatch(postProperties(data))
  };
};

const VisibleDeviceInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfoView);

export default VisibleDeviceInfo;
