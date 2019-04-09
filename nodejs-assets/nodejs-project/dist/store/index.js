"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_logger_1 = __importDefault(require("redux-logger"));
var redux_subscriber_1 = __importDefault(require("redux-subscriber"));
var reducers_1 = require("./devices/reducers");
var reducers_2 = require("./telemetry/reducers");
var store;
var rootReducer = redux_1.combineReducers({ devices: reducers_1.devices, telemetry: reducers_2.telemetry });
function getStore() {
    if (store) {
        return store;
    }
    store = _initializeStore();
    return store;
}
exports.getStore = getStore;
function _initializeStore() {
    var _store;
    console.log("Creating store...");
    _store = redux_1.createStore(rootReducer, redux_1.applyMiddleware(redux_logger_1.default));
    redux_subscriber_1.default(_store);
    console.log("Store Created!!");
    return _store;
}
