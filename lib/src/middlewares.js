"use strict";
var fs = require('fs');
var path = require('path');
var model_1 = require('./model');
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
        console.log('???', extname);
        if (extname === '.js' || extname === '.ts') {
            var name_1 = file.replace('.js', '');
            middlewares.push(model_1.createNappJSService(name_1, middlewarePath));
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