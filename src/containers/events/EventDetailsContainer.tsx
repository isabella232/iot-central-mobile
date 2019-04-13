import { connect } from "react-redux";
import { sendEvent, updateEvent } from "../../store/events";
import EventDetails from "../../components/tileDetails/EventDetails";
const mapStateToProps = (state, ownProps) => {
  const eventName =
    ownProps.eventName || ownProps.navigation.getParam("eventName");
  return {
    event: state.events[eventName],
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const eventName =
    ownProps.eventName || ownProps.navigation.getParam("eventName");
  return {
    updateEvent: value => dispatch(updateEvent(eventName, value))
  };
};

const VisibleEventDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails);

export default VisibleEventDetails;
