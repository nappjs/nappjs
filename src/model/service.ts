import { NappJS } from '../../';
import { NappJSModule, NappJSServiceContainer } from './module';
import { HealthCheckData } from '../healthcheck';

export const createNappJSService = (
  name: string,
  path: string
): NappJSServiceContainer => {
  const module = require(path);
  let defaultModule = module.default || module;
  if (!(defaultModule.prototype instanceof NappJSService)) {
    defaultModule = new NappJSObjectService(defaultModule);
  }
  return new NappJSServiceContainer(
    name,
    path,
    defaultModule,
    defaultModule.dependencies
  );
};

export class NappJSService extends NappJSModule {
  public static dependencies: string[] = [];
  async load(app: NappJS, ...args: any[]): Promise<void> {}
  async start(app: NappJS, ...args: any[]): Promise<void> {}
  async stop(app: NappJS, ...args: any[]): Promise<void> {}
  async getHealthCheckData(napp: NappJS): Promise<HealthCheckData> {
    return {};
  }
}

class NappJSObjectService extends NappJSService {
  module: any;
  constructor(module: any) {
    super();
  }

  async load(napp: NappJS, ...args: any[]): Promise<void> {
    if (typeof this.module.load === 'function') {
      return this.module.load(napp, ...args);
    }
  }

  async start(napp: NappJS, ...args: any[]): Promise<void> {
    if (typeof this.module.start === 'function') {
      return this.module.start(napp, ...args);
    } else if (typeof this.module === 'function') {
      return this.module(napp, ...args);
    }
  }

  async stop(napp: NappJS, ...args: any[]): Promise<void> {
    if (typeof this.module.stop === 'function') {
      return this.module.stop(napp, ...args);
    }
  }
}
