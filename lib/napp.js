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
var assert = require("assert");
var Bottle = require("bottlejs");
var cron_1 = require("cron");
var middlewares_1 = require("./middlewares");
var model_1 = require("./model");
var plugins_1 = require("./plugins");
var scripts_1 = require("./scripts");
var NappJS = (function () {
    function NappJS() {
        this.services = new Bottle();
        this.scripts = new Bottle();
        this.pluginWrappers = plugins_1.loadPlugins();
        this.middlewareWrappers = middlewares_1.loadMiddlewares();
        this.scriptWrappers = scripts_1.loadScripts();
        this.loaded = false;
    }
    NappJS.prototype.addService = function (name, service) {
        var dependencies = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            dependencies[_i - 2] = arguments[_i];
        }
        (_a = this.services).service.apply(_a, [name,
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (service instanceof model_1.NappJSService) {
                    return service;
                }
                return new (service.bind.apply(service, [void 0].concat(args)))();
            }].concat(dependencies));
        var _a;
    };
    NappJS.prototype.getService = function (name) {
        var val = this.services.container[name];
        assert.ok(val, "service " + name + " not registered");
        assert.ok(val instanceof model_1.NappJSService, "injected module " + name + " is not instance of NappJSService");
        return val;
    };
    NappJS.prototype.addScript = function (name, script) {
        this.scripts.service(name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (script instanceof model_1.NappJSScript) {
                return script;
            }
            return new (script.bind.apply(script, [void 0].concat(args)))();
        });
    };
    NappJS.prototype.getScript = function (name) {
        var val = this.scripts.container[name];
        assert.ok(val, "script " + name + " not registered");
        assert.ok(val instanceof model_1.NappJSScript, "injected module " + name + " is not instance of NappJSScript");
        return val;
    };
    NappJS.prototype.addMiddleware = function (name, path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.middlewareWrappers.push(model_1.createNappJSService(name, path));
                return [2];
            });
        });
    };
    NappJS.prototype.addPlugin = function (name, path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pluginWrappers.push(model_1.createNappJSService(name, path));
                return [2];
            });
        });
    };
    NappJS.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var all, _i, all_1, v, _a, _b, s, _c, all_2, v, s;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.loaded)
                            return [2];
                        all = this.pluginWrappers.concat(this.middlewareWrappers);
                        for (_i = 0, all_1 = all; _i < all_1.length; _i++) {
                            v = all_1[_i];
                            v.register(this);
                        }
                        for (_a = 0, _b = this.scriptWrappers; _a < _b.length; _a++) {
                            s = _b[_a];
                            s.register(this);
                        }
                        _c = 0, all_2 = all;
                        _d.label = 1;
                    case 1:
                        if (!(_c < all_2.length)) return [3, 4];
                        v = all_2[_c];
                        s = this.getService(v.name);
                        return [4, s.load(this)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _c++;
                        return [3, 1];
                    case 4:
                        this.loaded = true;
                        return [2];
                }
            });
        });
    };
    NappJS.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var all, _i, all_3, v, s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.load()];
                    case 1:
                        _a.sent();
                        all = this.pluginWrappers.concat(this.middlewareWrappers);
                        _i = 0, all_3 = all;
                        _a.label = 2;
                    case 2:
                        if (!(_i < all_3.length)) return [3, 5];
                        v = all_3[_i];
                        s = this.getService(v.name);
                        return [4, s.start(this)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [2];
                }
            });
        });
    };
    NappJS.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var all, _i, all_4, v, s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        all = this.pluginWrappers.concat(this.middlewareWrappers);
                        _i = 0, all_4 = all;
                        _a.label = 1;
                    case 1:
                        if (!(_i < all_4.length)) return [3, 4];
                        v = all_4[_i];
                        s = this.getService(v.name);
                        return [4, s.stop(this)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    NappJS.prototype.runScript = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var script;
            return __generator(this, function (_a) {
                script = this.getScript(name);
                if (script === null)
                    throw new Error("script " + name + " not found");
                return [2, script.run.apply(script, [this].concat(args))];
            });
        });
    };
    NappJS.prototype.startCron = function (crontime, timezone, name) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var script, isRunning, cron;
            return __generator(this, function (_a) {
                script = this.getScript(name);
                if (script === null)
                    throw new Error("script " + name + " not found");
                isRunning = false;
                cron = new cron_1.CronJob(crontime, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (isRunning) {
                                    console.log("script " + name + " still running, skipping");
                                    return [2];
                                }
                                isRunning = true;
                                console.log("starting script " + name);
                                return [4, script.run.apply(script, [this].concat(args))];
                            case 1:
                                _a.sent();
                                isRunning = false;
                                return [2];
                        }
                    });
                }); }, null, true, timezone);
                return [2, cron];
            });
        });
    };
    NappJS.prototype.getHealthCheckData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, _a, serviceName, service, hc, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = {};
                        _i = 0, _a = this.services.container.$list();
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        serviceName = _a[_i];
                        service = this.services.container[serviceName];
                        return [4, service.getHealthCheckData(this)];
                    case 2:
                        hc = _b.sent();
                        for (key in hc) {
                            result[key] = hc[key];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2, result];
                }
            });
        });
    };
    return NappJS;
}());
exports.NappJS = NappJS;
//# sourceMappingURL=napp.js.map