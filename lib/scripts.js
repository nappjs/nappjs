"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var model_1 = require("./model");
var plugins_1 = require("./plugins");
exports.loadScripts = function () {
    console.log('searching for scripts...');
    var scriptsPath = path.resolve(process.env.SCRIPTS_PATH || './scripts');
    var scripts = [];
    var pluginPaths = plugins_1.getPluginsPaths();
    var paths = pluginPaths
        .map(function (p) {
        return {
            plugin: path.basename(p),
            path: path.join(p, 'scripts')
        };
    })
        .concat([{ plugin: null, path: scriptsPath }]);
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var p = paths_1[_i];
        if (fs.existsSync(p.path)) {
            for (var _a = 0, _b = fs.readdirSync(p.path); _a < _b.length; _a++) {
                var filename = _b[_a];
                var extname = path.extname(filename);
                if (extname === '.js' ||
                    (p.path.indexOf('node_modules') === -1 &&
                        extname === '.ts' &&
                        filename.indexOf('.d.ts') === -1)) {
                    var name = (p.plugin ? p.plugin + "/" : '') +
                        path.basename(filename).replace(extname, '');
                    scripts.push(model_1.createNappJSScript(name, path.join(p.path, filename)));
                }
            }
        }
    }
    if (scripts.length === 0) {
        console.log('no scripts found');
    }
    else {
        console.log('scripts found:', scripts.map(function (x) { return x.name; }).join(', '));
    }
    return scripts;
};
//# sourceMappingURL=scripts.js.map