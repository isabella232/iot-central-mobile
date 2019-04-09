"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
// action creators
function updateTelemetry(telemetry) {
    return { type: types_1.UPDATE_TELEMETRY, telemetry: telemetry };
}
exports.updateTelemetry = updateTelemetry;
