"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NappJSModule = (function () {
    function NappJSModule() {
    }
    return NappJSModule;
}());
exports.NappJSModule = NappJSModule;
var NappJSServiceContainer = (function () {
    function NappJSServiceContainer(name, path, module, dependencies) {
        this.name = name;
        this.path = path;
        this.module = module;
        this.dependencies = dependencies;
    }
    NappJSServiceContainer.prototype.register = function (napp) {
        napp.addService.apply(napp, [this.name, this.module].concat((this.dependencies || [])));
    };
    return NappJSServiceContainer;
}());
exports.NappJSServiceContainer = NappJSServiceContainer;
var NappJSScriptContainer = (function () {
    function NappJSScriptContainer(name, path, module) {
        this.name = name;
        this.path = path;
        this.module = module;
    }
    NappJSScriptContainer.prototype.register = function (napp) {
        napp.addScript(this.name, this.module);
    };
    return NappJSScriptContainer;
}());
exports.NappJSScriptContainer = NappJSScriptContainer;
//# sourceMappingURL=module.js.map