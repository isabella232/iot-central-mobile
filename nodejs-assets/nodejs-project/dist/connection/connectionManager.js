"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dps_1 = __importDefault(require("dps-keygen/dps"));
var clientFromConnectionString = require("azure-iot-device-mqtt")
    .clientFromConnectionString;
var rnBridge = require("rn-bridge");
var Message = require("azure-iot-device").Message;
var _client;
var _twin;
var _deviceId;
function _computeConnectionString(appSymmetricKey, deviceId, scopeId) {
    return new Promise(function (resolve, reject) {
        dps_1.default.getConnectionString(deviceId, appSymmetricKey, scopeId, null, true, function (err, conStr) {
            if (err) {
                reject(err);
            }
            resolve(conStr);
        });
    });
}
function _getTwin(client) {
    return new Promise(function (resolve, reject) {
        client.getTwin(function (err, twin) {
            if (err) {
                reject(err);
            }
            resolve(twin);
        });
    });
}
function _listenForSettingsUpdate(deviceId, twin) {
    twin.on("properties.desired", function (desiredChange) {
        rnBridge.channel.post("/device/property/desired", {
            deviceId: deviceId,
            desiredChange: desiredChange
        });
        // TODO: send 'received' update to server
    });
}
// TODO: map request id to response, send after front end success
// TODO: receive this from front end
var commands = [
    "turn_on_flashlight",
    "turn_off_flashlight",
    "alert",
    "play_music"
];
function _listenForCommands(deviceId, client) {
    console.log("Listening for commands...");
    commands.forEach(function (command) {
        client.onDeviceMethod(command, function (request, response) {
            console.log("command received: " + command);
            rnBridge.channel.post("/command/received", {
                deviceId: deviceId,
                command: command,
                payload: request.payload,
                requestId: request.requestId
            });
            response.send(200);
        });
    });
}
function connect(appSymmetricKey, deviceId, scopeId) {
    return __awaiter(this, void 0, void 0, function () {
        var connectionString, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("appSymm " + appSymmetricKey + " devId " + deviceId + " scope " + scopeId);
                    console.log("Connecting...");
                    if (_deviceId === deviceId) {
                        console.log("Already Connected!");
                        return [2 /*return*/, { deviceId: deviceId, properties: _twin.properties }];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, _computeConnectionString(appSymmetricKey, deviceId, scopeId)];
                case 2:
                    connectionString = _a.sent();
                    _client = clientFromConnectionString(connectionString);
                    return [4 /*yield*/, _getTwin(_client)];
                case 3:
                    _twin = _a.sent();
                    _deviceId = deviceId;
                    _listenForSettingsUpdate(_deviceId, _twin);
                    _listenForCommands(_deviceId, _client);
                    // console.log(twin);
                    return [2 /*return*/, { deviceId: deviceId, properties: _twin.properties }];
                case 4:
                    e_1 = _a.sent();
                    console.log("Error connecting device.", e_1);
                    _client = null;
                    _twin = null;
                    _deviceId = null;
                    throw e_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.connect = connect;
function updateProperties(properties) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!_client) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, _updateProperties(_twin, properties)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log("Error Updating Properties", e_2);
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateProperties = updateProperties;
function updateSettingComplete(setting, desiredChange) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!_client) {
                return [2 /*return*/];
            }
            try {
                _updateSettingComplete(_twin, setting, desiredChange);
            }
            catch (e) {
                console.log("Error Updating Setting", e);
                throw e;
            }
            return [2 /*return*/];
        });
    });
}
exports.updateSettingComplete = updateSettingComplete;
function _updateSettingComplete(twin, setting, desiredChange) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, patch;
        return __generator(this, function (_b) {
            patch = (_a = {},
                _a[setting] = {
                    value: desiredChange[setting].value,
                    status: "completed",
                    desiredVersion: desiredChange.$version
                },
                _a);
            twin.properties.reported.update(patch, function (err) {
                return console.log("Sent setting update for " + setting + "; " +
                    (err ? "error: " + err.toString() : "status: success"));
            });
            return [2 /*return*/];
        });
    });
}
function _updateProperties(twin, properties) {
    return new Promise(function (resolve, reject) {
        if (!twin) {
            reject("Twin DNE");
        }
        twin.properties.reported.update(properties, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
function sendTelemetry(telemetry) {
    if (!_client) {
        return;
    }
    try {
        var message = new Message(JSON.stringify(telemetry));
        return _sendEvent(_client, message);
    }
    catch (e) {
        console.log("Error Sending Telemetry", e);
        throw e;
    }
}
exports.sendTelemetry = sendTelemetry;
function _sendEvent(client, message) {
    return new Promise(function (resolve, reject) {
        client.sendEvent(message, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}
