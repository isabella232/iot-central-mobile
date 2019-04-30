import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  compose
} from "redux";
import telemetry from "./telemetry";
import applications from "./applications";
import device from "./device";
import sensors from "./sensors";
import properties from "./properties";
import settings from "./settings";
import state from "./state";
import backend from "./backend";
import controls from "./controls/controls";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import Reactotron from "../../ReactotronConfig";
import events from "./events";
import flashlight from "./flashlight";
import deviceList from "./deviceList";
import brightness from "./brightness";
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
  device,
  ...sensors,
  properties,
  settings,
  backend,
  controls,
  events,
  state,
  flashlight,
  deviceList,
  brightness
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "telemetry",
    "properties",
    "settings",
    "controls",
    "events",
    "state",
    "flashlight",
    "brightness"
  ]
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
  const middlewares: Array<any> = [];
  middlewares.push(thunkMiddleware);
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
  return _store;
}

export type AppState = ReturnType<typeof rootReducer>;
