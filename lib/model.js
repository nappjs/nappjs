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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNappJSModule = function (name, path) {
    var module = require(path);
    if (module.prototype instanceof NappJSModule) {
        var instance = new module(name, path, null);
        return instance;
    }
    return new NappJSModule(name, path, module);
};
var NappJSModule = (function () {
    function NappJSModule(name, path, module) {
        this.name = name;
        this.path = path;
        this.module = module;
    }
    NappJSModule.prototype.load = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    NappJSModule.prototype.preRegister = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.module && typeof this.module.preRegister === 'function')) return [3, 2];
                        return [4, (_a = this.module).preRegister.apply(_a, [app].concat(args))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    NappJSModule.prototype.register = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.module && typeof this.module.register === 'function')) return [3, 2];
                        return [4, (_a = this.module).register.apply(_a, [app].concat(args))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    NappJSModule.prototype.postRegister = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.module && typeof this.module.postRegister === 'function')) return [3, 2];
                        return [4, (_a = this.module).postRegister.apply(_a, [app].concat(args))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    NappJSModule.prototype.preStart = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (this.module && typeof this.module.preStart === 'function') {
                    return [2, Promise.resolve((_a = this.module).preStart.apply(_a, [app].concat(args)))];
                }
                return [2];
            });
        });
    };
    NappJSModule.prototype.start = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (this.module && typeof this.module.start === 'function') {
                    return [2, Promise.resolve((_a = this.module).start.apply(_a, [app].concat(args)))];
                }
                else if (this.module && typeof this.module === 'function') {
                    return [2, Promise.resolve(this.module.apply(this, [app].concat(args)))];
                }
                return [2];
            });
        });
    };
    NappJSModule.prototype.postStart = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (this.module && typeof this.module.postStart === 'function') {
                    return [2, Promise.resolve((_a = this.module).postStart.apply(_a, [app].concat(args)))];
                }
                return [2];
            });
        });
    };
    NappJSModule.prototype.preStop = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (this.module && typeof this.module.preStop === 'function') {
                    return [2, Promise.resolve((_a = this.module).preStop.apply(_a, [app].concat(args)))];
                }
                return [2];
            });
        });
    };
    NappJSModule.prototype.stop = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (this.module && typeof this.module.stop === 'function') {
                    return [2, Promise.resolve((_a = this.module).stop.apply(_a, [app].concat(args)))];
                }
                return [2];
            });
        });
    };
    NappJSModule.prototype.postStop = function (app) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (this.module && typeof this.module.postStop === 'function') {
                    return [2, Promise.resolve((_a = this.module).postStop.apply(_a, [app].concat(args)))];
                }
                return [2];
            });
        });
    };
    return NappJSModule;
}());
exports.NappJSModule = NappJSModule;
//# sourceMappingURL=model.js.map