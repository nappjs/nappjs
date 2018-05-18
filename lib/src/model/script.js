"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var module_1 = require('./module');
exports.createNappJSScript = function (name, path) {
    var module = require(path);
    var defaultModule = module.default || module;
    if (!(defaultModule.prototype instanceof NappJSScript)) {
        defaultModule = new NappJSObjectScript(defaultModule);
    }
    return new module_1.NappJSScriptContainer(name, path, defaultModule);
};
var NappJSScript = (function (_super) {
    __extends(NappJSScript, _super);
    function NappJSScript() {
        _super.apply(this, arguments);
    }
    NappJSScript.prototype.run = function (app) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        });
    };
    return NappJSScript;
}(module_1.NappJSModule));
exports.NappJSScript = NappJSScript;
var NappJSObjectScript = (function (_super) {
    __extends(NappJSObjectScript, _super);
    function NappJSObjectScript(module) {
        _super.call(this);
        this.module = module;
    }
    NappJSObjectScript.prototype.run = function (napp) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (typeof this.module.run === 'function') {
                return (_a = this.module).run.apply(_a, [napp].concat(args));
            }
            else if (typeof this.module === 'function') {
                return this.module.apply(this, [napp].concat(args));
            }
            var _a;
        });
    };
    return NappJSObjectScript;
}(NappJSScript));
//# sourceMappingURL=script.js.map