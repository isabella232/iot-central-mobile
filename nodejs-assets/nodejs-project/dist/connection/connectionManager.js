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
var actions_1 = require("../store/devices/actions");
var index_1 = require("../store/index");
var clientFromConnectionString = require("azure-iot-device-mqtt")
    .clientFromConnectionString;
var rnBridge = require("rn-bridge");
function _computeConnectionString(appSymmetricKey, deviceId, scopeId) {
    return new Promise(function (resolve, reject) {
        dps_1.default.getConnectionString(deviceId, appSymmetricKey, scopeId, null, true, function (err, conStr) {
            console.log("Callback");
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
    /*
    twin.on("message", msg => {
      console.log("MESSAGE RECEIVED");
      console.log(JSON.stringify(msg));
  
      rnBridge.channel.post("/device/property/desired", {
        deviceId,
        msg
      });
    });*/
}
function connect(appSymmetricKey, deviceId, scopeId) {
    return __awaiter(this, void 0, void 0, function () {
        var connectionString, client, twin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("appSymm " + appSymmetricKey + " devId " + deviceId + " scope " + scopeId);
                    return [4 /*yield*/, _computeConnectionString(appSymmetricKey, deviceId, scopeId)];
                case 1:
                    connectionString = _a.sent();
                    console.log("Connecting...");
                    client = clientFromConnectionString(connectionString);
                    return [4 /*yield*/, _getTwin(client)];
                case 2:
                    twin = _a.sent();
                    console.log("Got Twin.");
                    console.log("" + twin.properties);
                    _listenForSettingsUpdate(deviceId, twin);
                    _listenForCommands(deviceId, client);
                    index_1.getStore().dispatch(actions_1.connectDevice(deviceId, client, twin));
                    // console.log(twin);
                    return [2 /*return*/, { deviceId: deviceId, properties: twin.properties }];
            }
        });
    });
}
exports.connect = connect;
function _getAllTwins() {
    var state = index_1.getStore().getState();
    var twins = [];
    for (var key in state.devices) {
        var twin = index_1.getStore().getState().devices[key].twin;
        twins.push(twin);
    }
    return twins;
}
function updateProperties(properties) {
    return __awaiter(this, void 0, void 0, function () {
        var twins;
        return __generator(this, function (_a) {
            console.log("Updating Properties...");
            console.log("" + properties);
            console.log("" + JSON.stringify(properties));
            twins = _getAllTwins();
            twins.map(function (twin) {
                _updateProperties(twin, properties);
            });
            return [2 /*return*/];
        });
    });
}
exports.updateProperties = updateProperties;
function updateSettingComplete(setting, desiredChange) {
    return __awaiter(this, void 0, void 0, function () {
        var twins;
        return __generator(this, function (_a) {
            console.log("Updating Setting Complete...");
            console.log("" + setting);
            console.log("" + JSON.stringify(setting));
            twins = _getAllTwins();
            twins.map(function (twin) {
                _updateSettingComplete(twin, setting, desiredChange);
            });
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
        twin.properties.reported.update(properties, function (err) {
            if (err) {
                console.log("Error Updating Properties!!");
                reject(err);
            }
            resolve();
        });
    });
}
