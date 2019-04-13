import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  compose
} from "redux";
import { createLogger } from "redux-logger";
import telemetry from "./telemetry";
import applications from "./applications";
import devices from "./devices";
import sensors from "./sensors";
import properties from "./properties";
import settings from "./settings";
import backend from "./backend";
import controls from "./controls/controls";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import Reactotron from "../../ReactotronConfig";
import events from "./events";
import {
  SEND_TELEMETRY,
  SEND_TELEMETRY_FAIL,
  SEND_TELEMETRY_SUCCESS,
  UPDATE_TELEMETRY
} from "./telemetry";
//import { SENSOR_ACTION_TYPES } from "./sensors/index";

let store: Store;
let persistor;
const rootReducer = combineReducers({
  // @ts-ignore
  telemetry,
  applications,
  devices,
  ...sensors,
  properties,
  settings,
  backend,
  controls,
  events
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["backend"]
};

export function getStore(): Store {
  if (store) {
    return store;
  }
  store = _initializeStore();
  persistor = persistStore(store);
  return store;
}

export function getPersistor() {
  return persistor;
}

function _initializeStore(): Store {
  let _store: Store;
  console.log("Creating store...");
  const middlewares: Array<any> = [];
  middlewares.push(thunkMiddleware);
  if (process.env.NODE_ENV === `development` && false) {
    const blacklistedActions = []; /* [
      SEND_TELEMETRY_FAIL,
      SEND_TELEMETRY_SUCCESS,
      UPDATE_TELEMETRY,
      SEND_TELEMETRY
    ]; */
    //.concat(SENSOR_ACTION_TYPES);
    const logger = createLogger();
    /*{
      predicate: (getState, action) => !blacklistedActions.includes(action.type)
    });*/

    middlewares.push(logger);
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  let enhancer;
  if (Reactotron.createEnhancer) {
    enhancer = Reactotron.createEnhancer();
  }
  _store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(...middlewares),
      enhancer
    )
  );
  //initSubscriber(_store);
  console.log("Store Created!!");
  return _store;
}

export type AppState = ReturnType<typeof rootReducer>;
