"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var filename = process.cwd() + '/tracing.json';
var TRACING_PREFIX = process.env.TRACING_PREFIX;
if (fs_1.existsSync(filename)) {
    console.log("starting google-cloud tracing with config " + filename);
    require('@google-cloud/trace-agent').start({
        rootSpanNameOverride: function (name) {
            return "" + (TRACING_PREFIX ? TRACING_PREFIX + '-' : '') + name;
        },
        projectId: 'novacloud-cz',
        keyFilename: filename,
        ignoreUrls: [/^\/healthcheck/],
        ignoreMethods: ['options']
    });
}
//# sourceMappingURL=tracing.js.map