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
var Mqtt = require("azure-iot-device-mqtt").Mqtt;
var rnBridge = require("rn-bridge");
var azure_iot_device_1 = require("azure-iot-device");
var logger_1 = require("../logging/logger");
var _client;
var _twin;
var _deviceId;
process.on("uncaughtException", function (err) {
    logger_1.logError("UNCAUGHT EMITTER EXCEPTION", err);
});
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
    logger_1.logInfo("Listening for commands...");
    commands.forEach(function (command) {
        client.onDeviceMethod(command, function (request, response) {
            logger_1.logInfo("command received: " + command);
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
function closeClient(client) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    client.close(function (err, result) {
                        if (err) {
                            return reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                })];
        });
    });
}
function disconnect() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (_twin) {
                _twin.removeAllListeners();
            }
            if (_client) {
                _client.removeAllListeners();
                closeClient(_client).catch(function (e) { return logger_1.logError("Error closing client", e); });
            }
            _deviceId = null;
            // @ts-ignore
            _client = null;
            // @ts-ignore
            _twin = null;
            return [2 /*return*/];
        });
    });
}
function connect(appSymmetricKey, deviceId, scopeId) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, connectionString, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.logInfo("appSymm " + appSymmetricKey + " devId " + deviceId + " scope " + scopeId);
                    logger_1.logInfo("Connecting...");
                    if (!(_deviceId === deviceId)) return [3 /*break*/, 1];
                    logger_1.logInfo("Already Connected!");
                    return [2 /*return*/, { deviceId: deviceId, properties: _twin.properties }];
                case 1:
                    if (!_deviceId) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    logger_1.logInfo("Disconnecting Existing Device...");
                    return [4 /*yield*/, disconnect()];
                case 3:
                    _a.sent();
                    logger_1.logInfo("Device Disconnected");
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    logger_1.logError("Error trying to close existing connection, continuing.");
                    return [3 /*break*/, 5];
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    logger_1.logInfo("Creating connection string...");
                    return [4 /*yield*/, _computeConnectionString(appSymmetricKey, deviceId, scopeId)];
                case 6:
                    connectionString = _a.sent();
                    logger_1.logInfo("Success.");
                    logger_1.logInfo("Getting client...");
                    _client = azure_iot_device_1.Client.fromConnectionString(connectionString, Mqtt);
                    logger_1.logInfo("Success.");
                    logger_1.logInfo("Getting twin...");
                    return [4 /*yield*/, _getTwin(_client)];
                case 7:
                    _twin = _a.sent();
                    logger_1.logInfo("Success.");
                    _deviceId = deviceId;
                    _listenForSettingsUpdate(_deviceId, _twin);
                    _listenForCommands(_deviceId, _client);
                    return [2 /*return*/, { deviceId: deviceId, properties: _twin.properties }];
                case 8:
                    e_2 = _a.sent();
                    logger_1.logError("Error connecting device.", e_2);
                    disconnect();
                    throw e_2;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.connect = connect;
function updateProperties(properties) {
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, _updateProperties(_twin, properties)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    logger_1.logError("Error Updating Properties", e_3);
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateProperties = updateProperties;
function updateSettingComplete(setting, desiredChange) {
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, _updateSettingComplete(_twin, setting, desiredChange)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    logger_1.logError("Error Updating Setting", e_4);
                    throw e_4;
                case 3: return [2 /*return*/];
            }
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
            return [2 /*return*/, _updateProperties(twin, patch)];
        });
    });
}
function _updateProperties(twin, properties, retryCount) {
    if (retryCount === void 0) { retryCount = 0; }
    var timeoutPromise = new Promise(function (resolve, reject) {
        setTimeout(reject, 5000, "Timeout");
    });
    var updatePromise = new Promise(function (resolve, reject) {
        if (!twin || !twin.properties || !twin.properties.reported) {
            return resolve("Twin DNE");
        }
        twin.properties.reported.update(properties, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
    return Promise.race([timeoutPromise, updatePromise]).catch(function (e) {
        logger_1.logInfo("Error updating properties, retryCount:", retryCount, "Error:", e);
        if (retryCount > 2) {
            logger_1.logInfo("Max retry count hit, disconnecting.", retryCount, "Error:", e);
            return disconnect();
        }
        else {
            retryCount++;
            return _updateProperties(twin, properties, retryCount);
        }
    });
}
// UnauthorizedError || NotConnectedError
function sendTelemetry(telemetry) {
    try {
        var message = new azure_iot_device_1.Message(JSON.stringify(telemetry));
        return _sendEvent(_client, message);
    }
    catch (e) {
        logger_1.logInfo("Error Sending Telemetry", e);
        throw e;
    }
}
exports.sendTelemetry = sendTelemetry;
function _sendEvent(client, message) {
    return new Promise(function (resolve, reject) {
        if (!client) {
            resolve({});
        }
        client.sendEvent(message, function (err, res) {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
}
