"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var findNodeModules = require("find-node-modules");
var fs = require("fs");
var path = require("path");
var model_1 = require("./model");
exports.getPluginsPaths = function () {
    var pluginsPath = path.resolve(process.env.PLUGINS_PATH || "./plugins/");
    var paths = [];
    if (fs.existsSync(pluginsPath)) {
        paths = fs.readdirSync(pluginsPath);
        paths = paths.map(function (file) {
            return path.join(pluginsPath, file);
        });
    }
    var nodeModulesPaths = findNodeModules(null);
    if (process.env.LOAD_GLOBAL_PLUGINS) {
        nodeModulesPaths.push(require("global-modules"));
    }
    for (var _i = 0, nodeModulesPaths_1 = nodeModulesPaths; _i < nodeModulesPaths_1.length; _i++) {
        var pluginsPath_1 = nodeModulesPaths_1[_i];
        var matches = fs.readdirSync(pluginsPath_1).filter(function (name) {
            return name.indexOf("nappjs-") === 0;
        });
        for (var _a = 0, matches_1 = matches; _a < matches_1.length; _a++) {
            var match = matches_1[_a];
            match = path.join(pluginsPath_1, match);
            if (!path.isAbsolute(match)) {
                match = path.join(process.cwd(), match);
            }
            paths.push(match);
        }
    }
    return paths;
};
exports.loadPlugins = function () {
    console.log("searching for plugins...");
    var paths = exports.getPluginsPaths();
    var plugins = [];
    paths.forEach(function (file) {
        var pluginName = path.basename(file);
        plugins.push(model_1.createNappJSModule(pluginName, file));
    });
    if (plugins.length === 0) {
        console.log("no plugins found");
    }
    else {
        console.log("plugins found:", plugins.map(function (x) { return x.name; }).join(', '));
    }
    return plugins;
};
//# sourceMappingURL=plugins.js.map