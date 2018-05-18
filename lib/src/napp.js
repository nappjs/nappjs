"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var assert = require('assert');
var Bottle = require('bottlejs');
var cron_1 = require('cron');
var middlewares_1 = require('./middlewares');
var model_1 = require('./model');
var plugins_1 = require('./plugins');
var scripts_1 = require('./scripts');
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
        (_a = this.services).service.apply(_a, [name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
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
                args[_i - 0] = arguments[_i];
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
        return __awaiter(this, void 0, void 0, function* () {
            this.middlewareWrappers.push(model_1.createNappJSService(name, path));
        });
    };
    NappJS.prototype.addPlugin = function (name, path) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pluginWrappers.push(model_1.createNappJSService(name, path));
        });
    };
    NappJS.prototype.load = function () {
        return __awaiter(this, void 0, Promise, function* () {
            if (this.loaded)
                return;
            var all = this.pluginWrappers.concat(this.middlewareWrappers);
            for (var _i = 0, all_1 = all; _i < all_1.length; _i++) {
                var v = all_1[_i];
                v.register(this);
            }
            for (var _a = 0, _b = this.scriptWrappers; _a < _b.length; _a++) {
                var s = _b[_a];
                s.register(this);
            }
            for (var _c = 0, all_2 = all; _c < all_2.length; _c++) {
                var v = all_2[_c];
                var s = this.getService(v.name);
                yield s.load(this);
            }
            this.loaded = true;
        });
    };
    NappJS.prototype.start = function () {
        return __awaiter(this, void 0, Promise, function* () {
            yield this.load();
            var all = this.pluginWrappers.concat(this.middlewareWrappers);
            for (var _i = 0, all_3 = all; _i < all_3.length; _i++) {
                var v = all_3[_i];
                var s = this.getService(v.name);
                yield s.start(this);
            }
        });
    };
    NappJS.prototype.stop = function () {
        return __awaiter(this, void 0, Promise, function* () {
            var all = this.pluginWrappers.concat(this.middlewareWrappers);
            for (var _i = 0, all_4 = all; _i < all_4.length; _i++) {
                var v = all_4[_i];
                var s = this.getService(v.name);
                yield s.stop(this);
            }
        });
    };
    NappJS.prototype.runScript = function (name) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var script = this.getScript(name);
            if (script === null)
                throw new Error("script " + name + " not found");
            return script.run.apply(script, [this].concat(args));
        });
    };
    NappJS.prototype.startCron = function (crontime, timezone, name) {
        return __awaiter(this, void 0, Promise, function* () {
            var _this = this;
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var script = this.getScript(name);
            if (script === null)
                throw new Error("script " + name + " not found");
            var isRunning = false;
            var cron = new cron_1.CronJob(crontime, function () __awaiter(this, void 0, void 0, function* () {
                if (isRunning) {
                    console.log("script " + name + " still running, skipping");
                    return;
                }
                isRunning = true;
                console.log("starting script " + name);
                try {
                    yield script.run.apply(script, [_this].concat(args));
                }
                catch (e) {
                    console.log("script " + name + " failed with error:", e);
                }
                isRunning = false;
            }), null, true, timezone);
            return cron;
        });
    };
    NappJS.prototype.getHealthCheckData = function () {
        return __awaiter(this, void 0, Promise, function* () {
            var result = {};
            for (var _i = 0, _a = this.services.container.$list(); _i < _a.length; _i++) {
                var serviceName = _a[_i];
                var service = this.services.container[serviceName];
                var hc = yield service.getHealthCheckData(this);
                for (var key in hc) {
                    result[key] = hc[key];
                }
            }
            return result;
        });
    };
    return NappJS;
}());
exports.NappJS = NappJS;
//# sourceMappingURL=napp.js.map