"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
// TODO: initialize telemetry
function telemetry(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case types_1.UPDATE_TELEMETRY:
            return Object.assign({}, state, action.telemetry);
        default:
            return state;
    }
}
exports.telemetry = telemetry;
