"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.read = exports.convert = exports.downloadFromS3 = void 0;
var child_process_1 = require("child_process");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
// @ts-ignore
var big_json_1 = __importDefault(require("big-json"));
function isExists(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.promises.access(filePath)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, true];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function isExtname(filePath, ext) {
    var fileExt = path.extname(filePath);
    return fileExt === ext;
}
function downloadFromS3(_a) {
    var _this = this;
    var accessKeyId = _a.accessKeyId, secretAccessKey = _a.secretAccessKey, endpointUrl = _a.endpointUrl, bucketName = _a.bucketName, pathsToLoad = _a.pathsToLoad, directoryPath = _a.directoryPath, destinationPath = _a.destinationPath;
    return new Promise(function (resolve, reject) {
        var python = (0, child_process_1.spawn)("/usr/bin/env", [
            "python3",
            path.resolve(__dirname, "./download.py"),
            accessKeyId,
            secretAccessKey,
            endpointUrl,
            bucketName,
            pathsToLoad.join(","),
            directoryPath,
            destinationPath,
        ]);
        python.stderr.on("data", function (error) { return reject(error.toString()); });
        python.on("close", function () { return __awaiter(_this, void 0, void 0, function () {
            var newPaths, rmDir, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.all(pathsToLoad.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                                var oldPath, newPath;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            oldPath = path.resolve(destinationPath, p);
                                            newPath = path.resolve(destinationPath, path.basename(p));
                                            return [4 /*yield*/, fs.promises.rename(oldPath, newPath)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, newPath];
                                    }
                                });
                            }); }))];
                    case 1:
                        newPaths = _a.sent();
                        rmDir = path.resolve(__dirname, directoryPath.split("/")[0]);
                        return [4 /*yield*/, fs.promises.rm(rmDir, { force: true, recursive: true })];
                    case 2:
                        _a.sent();
                        resolve(newPaths);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        reject(e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
}
exports.downloadFromS3 = downloadFromS3;
function convertToJson(fromPkl, toJson) {
    return new Promise(function (resolve, reject) {
        var python = (0, child_process_1.spawn)("/usr/bin/env", [
            "python3",
            path.resolve(__dirname, "./convert.py"),
            fromPkl,
            toJson,
        ]);
        python.stderr.on("data", function () {
            return reject("Error in python script while converting");
        });
        python.on("close", function () { return resolve(); });
    });
}
function convert(fromPkl, toJson) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!isExtname(fromPkl, ".pkl")) {
                        throw new Error("".concat(fromPkl, " is not .pkl file"));
                    }
                    if (!isExtname(toJson, ".json")) {
                        throw new Error("".concat(toJson, " is not .json file"));
                    }
                    return [4 /*yield*/, isExists(fromPkl)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Can not find ".concat(fromPkl));
                    }
                    return [4 /*yield*/, isExists(toJson)];
                case 2:
                    if (_a.sent()) {
                        return [2 /*return*/, resolve(toJson)];
                    }
                    return [4 /*yield*/, convertToJson(fromPkl, toJson)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, resolve(toJson)];
                case 4:
                    e_2 = _a.sent();
                    reject(e_2.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
exports.convert = convert;
function read(jsonPath) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var jsonData_1, readStream, parseStream, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!isExtname(jsonPath, ".json")) {
                        throw new Error("".concat(jsonPath, " is not .json file"));
                    }
                    return [4 /*yield*/, isExists(jsonPath)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Can not find ".concat(jsonPath));
                    }
                    readStream = fs.createReadStream(jsonPath);
                    parseStream = big_json_1.default.createParseStream();
                    readStream.pipe(parseStream);
                    parseStream.on("data", function (data) { return (jsonData_1 = data); });
                    parseStream.on("error", function () { return reject("Error during reading json file"); });
                    parseStream.on("end", function () { return resolve(jsonData_1); });
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    reject(e_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
exports.read = read;
