"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var filename = process.cwd() + '/tracing.json';
var TRACING_PREFIX = process.env.TRACING_PREFIX || '';
var TRACING_BUFFER_SIZE = process.env.TRACING_BUFFER_SIZE;
if (fs_1.existsSync(filename)) {
    console.log("starting google-cloud tracing with config " + filename);
    require('@google-cloud/trace-agent').start({
        rootSpanNameOverride: function (name) { return "" + TRACING_PREFIX + name; },
        keyFilename: filename,
        ignoreUrls: ['/healthcheck'],
        ignoreMethods: ['options'],
        bufferSize: TRACING_BUFFER_SIZE
    });
}
//# sourceMappingURL=tracing.js.map