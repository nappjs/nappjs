import { existsSync } from 'fs';

const filename = 'tracing.json';

if (existsSync(filename)) {
  require('@google-cloud/trace-agent').start({
    projectId: 'novacloud-cz',
    keyFilename: filename,
    ignoreUrls: [/^\/healthcheck#/],
    ignoreMethods: ['options']
  });
}
