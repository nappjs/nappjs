"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var filename = 'tracing.json';
if (fs_1.existsSync(filename)) {
    require('@google-cloud/trace-agent').start({
        projectId: 'novacloud-cz',
        keyFilename: filename,
        ignoreUrls: [/^\/healthcheck#/],
        ignoreMethods: ['options']
    });
}
//# sourceMappingURL=tracing.js.map