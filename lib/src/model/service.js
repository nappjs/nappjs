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
exports.createNappJSService = function (name, filepath) {
    console.log('???', filepath);
    var module = require(filepath);
    var defaultModule = module.default || module;
    if (!(defaultModule.prototype instanceof NappJSService)) {
        defaultModule = new NappJSObjectService(defaultModule);
    }
    return new module_1.NappJSServiceContainer(name, filepath, defaultModule, defaultModule.dependencies);
};
var NappJSService = (function (_super) {
    __extends(NappJSService, _super);
    function NappJSService() {
        _super.apply(this, arguments);
    }
    NappJSService.prototype.load = function (app) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        });
    };
    NappJSService.prototype.start = function (app) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        });
    };
    NappJSService.prototype.stop = function (app) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        });
    };
    NappJSService.prototype.getHealthCheckData = function (napp) {
        return __awaiter(this, void 0, Promise, function* () {
            return {};
        });
    };
    NappJSService.dependencies = [];
    return NappJSService;
}(module_1.NappJSModule));
exports.NappJSService = NappJSService;
var NappJSObjectService = (function (_super) {
    __extends(NappJSObjectService, _super);
    function NappJSObjectService(module) {
        _super.call(this);
    }
    NappJSObjectService.prototype.load = function (napp) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (typeof this.module.load === 'function') {
                return (_a = this.module).load.apply(_a, [napp].concat(args));
            }
            var _a;
        });
    };
    NappJSObjectService.prototype.start = function (napp) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (typeof this.module.start === 'function') {
                return (_a = this.module).start.apply(_a, [napp].concat(args));
            }
            else if (typeof this.module === 'function') {
                return this.module.apply(this, [napp].concat(args));
            }
            var _a;
        });
    };
    NappJSObjectService.prototype.stop = function (napp) {
        return __awaiter(this, void 0, Promise, function* () {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (typeof this.module.stop === 'function') {
                return (_a = this.module).stop.apply(_a, [napp].concat(args));
            }
            var _a;
        });
    };
    return NappJSObjectService;
}(NappJSService));
//# sourceMappingURL=service.js.map