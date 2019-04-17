import { connect } from "react-redux";
import {
  subscribe as subscribeBackend,
  unsubscribe as unsubscribeBackend
} from "../../store/backend";
import AppLoading from "../../components/screens/AppLoading";
import SubscriptionLayer from "../../components/screens/SubscriptionLayer";

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps };
};

const mapDispatchToProps = dispatch => {
  return {
    unsubscribe: () => dispatch(unsubscribeBackend()),
    subscribe: () => dispatch(subscribeBackend())
  };
};

const VisibleSubscriptionLayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionLayer);

export default VisibleSubscriptionLayer;
