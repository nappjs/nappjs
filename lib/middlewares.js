"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var model_1 = require("./model");
exports.loadMiddlewares = function () {
    console.log('searching for middlewares...');
    var middlewaresPath = path.resolve(process.env.MIDDLEWARES_PATH || './middlewares/');
    var middlewares = [];
    var paths = [];
    if (fs.existsSync(middlewaresPath)) {
        paths = fs.readdirSync(middlewaresPath);
    }
    paths.forEach(function (file) {
        var middlewarePath = path.join(middlewaresPath, file);
        var extname = path.extname(file);
        if (extname === '.js' ||
            (file.indexOf('node_modules') === -1 &&
                extname === '.ts' &&
                file.indexOf('.d.ts') === -1)) {
            var name = file.replace(extname, '');
            middlewares.push(model_1.createNappJSService(name, middlewarePath));
        }
    });
    if (middlewares.length === 0) {
        console.log('no middlewares found');
    }
    else {
        console.log('middlewares found:', middlewares.map(function (x) { return x.name; }).join(', '));
    }
    return middlewares;
};
//# sourceMappingURL=middlewares.js.map