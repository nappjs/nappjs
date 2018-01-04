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
var middlewares_1 = require("./middlewares");
var plugins_1 = require("./plugins");
var scripts_1 = require("./scripts");
var model_1 = require("./model");
var NappJS = (function () {
    function NappJS() {
        this.locals = {};
        this.plugins = plugins_1.loadPlugins();
        this.middlewares = middlewares_1.loadMiddlewares();
        this.scripts = scripts_1.loadScripts();
    }
    NappJS.prototype.addMiddleware = function (name, path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.middlewares.push(new model_1.NappJSModule(name, path));
                return [2];
            });
        });
    };
    NappJS.prototype.addPlugin = function (name, path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.plugins.push(new model_1.NappJSModule(name, path));
                return [2];
            });
        });
    };
    NappJS.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var all, _i, all_1, v, _a, all_2, v;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        all = this.plugins.concat(this.middlewares).concat(this.scripts);
                        _i = 0, all_1 = all;
                        _b.label = 1;
                    case 1:
                        if (!(_i < all_1.length)) return [3, 4];
                        v = all_1[_i];
                        return [4, v.load(this)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        _a = 0, all_2 = all;
                        _b.label = 5;
                    case 5:
                        if (!(_a < all_2.length)) return [3, 8];
                        v = all_2[_a];
                        return [4, v.register(this)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _a++;
                        return [3, 5];
                    case 8: return [2];
                }
            });
        });
    };
    NappJS.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var all, _i, all_3, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        all = this.plugins.concat(this.middlewares);
                        _i = 0, all_3 = all;
                        _a.label = 1;
                    case 1:
                        if (!(_i < all_3.length)) return [3, 4];
                        v = all_3[_i];
                        return [4, v.start(this)];
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
                script = this.findScript(name);
                if (script === null)
                    throw new Error("script " + name + " not found");
                return [2, script.start.apply(script, [this].concat(args))];
            });
        });
    };
    NappJS.prototype.findPlugin = function (name) {
        return this.middlewares.reduce(function (prev, curr) {
            return prev || (curr.name === name ? curr : null);
        }, null);
    };
    NappJS.prototype.findMiddleware = function (name) {
        return this.middlewares.reduce(function (prev, curr) {
            return prev || (curr.name === name ? curr : null);
        }, null);
    };
    NappJS.prototype.findScript = function (name) {
        return this.scripts.reduce(function (prev, curr) {
            return prev || (curr.name === name ? curr : null);
        }, null);
    };
    return NappJS;
}());
exports.NappJS = NappJS;
//# sourceMappingURL=napp.js.map