import { existsSync } from 'fs';

const filename = process.cwd() + '/tracing.json';
const TRACING_PREFIX = process.env.TRACING_PREFIX;

if (existsSync(filename)) {
  console.log(`starting google-cloud tracing with config ${filename}`);
  require('@google-cloud/trace-agent').start({
    rootSpanNameOverride: (name: string) =>
      `${TRACING_PREFIX ? TRACING_PREFIX + '-' : ''}${name}`,
    projectId: 'novacloud-cz',
    keyFilename: filename,
    ignoreUrls: ['/healthcheck'],
    ignoreMethods: ['options']
  });
}
