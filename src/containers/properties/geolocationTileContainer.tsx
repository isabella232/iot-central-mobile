import { connect } from "react-redux";
import GeolocationTile from "../../components/tiles/geolocationTile";
import { postProperties } from "../../store/properties/reportedduck";
import geolocation from "../../store/sensors/propertySensors/geolocation";

// TODO: refactor state to contain original format, transform before sending to backend
const mapStateToProps = state => {
  return {
    ...state.geolocation,
    title: "Geolocation"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch(geolocation.updateData(data)),
    post: data => dispatch(postProperties(transformData(data)))
  };
};

const VisibleGeolocation = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeolocationTile);

export default VisibleGeolocation;

// transforms data to state for telemetry
function transformData(position) {
  return {
    location: {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  };
}
