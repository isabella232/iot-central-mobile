import * as geolocation from "./geolocationduck";

export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export default function reducer(state = { subscriptions: [] }, action) {
  switch (action.type) {
    case SUBSCRIBE:
      return Object.assign({}, state, {
        subscriptions: [...state.subscriptions, action.subscription]
      });
    case UNSUBSCRIBE:
      return Object.assign({}, state, { subscriptions: [] });
    default:
      return state;
  }
}

function _subscribeAll() {
  return { type: SUBSCRIBE };
}

function _unsubscribeAll() {}

export function subscribeAll() {}

export function unsubscribeAll() {
  return { type: UNSUBSCRIBE };
}
