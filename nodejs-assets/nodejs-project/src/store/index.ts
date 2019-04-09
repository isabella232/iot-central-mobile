import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import logger from "redux-logger";
import initSubscriber from "redux-subscriber";
import { devices } from "./devices/reducers";
import { telemetry } from "./telemetry/reducers";

let store: Store;
const rootReducer = combineReducers({ devices, telemetry });

export function getStore(): Store {
  if (store) {
    return store;
  }
  store = _initializeStore();
  return store;
}

function _initializeStore(): Store {
  let _store: Store;
  console.log("Creating store...");
  _store = createStore(rootReducer, applyMiddleware(logger));
  initSubscriber(_store);
  console.log("Store Created!!");
  return _store;
}

export type AppState = ReturnType<typeof rootReducer>;
