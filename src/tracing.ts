import { existsSync } from 'fs';

const filename = process.cwd() + '/tracing.json';
const TRACING_PREFIX = process.env.TRACING_PREFIX || '';
const TRACING_BUFFER_SIZE = process.env.TRACING_BUFFER_SIZE;

if (existsSync(filename)) {
  console.log(`starting google-cloud tracing with config ${filename}`);
  require('@google-cloud/trace-agent').start({
    rootSpanNameOverride: (name: string) => `${TRACING_PREFIX}${name}`,
    keyFilename: filename,
    ignoreUrls: ['/healthcheck'],
    ignoreMethods: ['options'],
    bufferSize: TRACING_BUFFER_SIZE
  });
}
