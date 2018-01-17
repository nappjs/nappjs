import { NappJS } from '../../';
import { NappJSModule, NappJSServiceContainer } from './module';

export const createNappJSService = (name: string, path: string): NappJSServiceContainer => {
  const module = require(path);
  let defaultModule = module.default || module;
  // console.log('!!!',module,defaultModule)
  if (!(defaultModule.prototype instanceof NappJSService)) {
    // console.log('!!!!',defaultModule)
    defaultModule = new NappJSObjectService(defaultModule)

    // console.log('after')
    // defaultModule.start()
    // let start = defaultModule.start
    // defaultModule = new NappJSService()
    // defaultModule.start = start.bind(defaultModule)
    // console.log('2!!!!!',defaultModule)
  }
  return new NappJSServiceContainer(name, path, defaultModule, defaultModule.dependencies);
};

export class NappJSService extends NappJSModule {
  public static dependencies: string[] = []
  async start(app: NappJS, ...args: any[]): Promise<void> {}
  async stop(app: NappJS, ...args: any[]): Promise<void> {}
}

class NappJSObjectService extends NappJSService {
  module: any
  constructor(module: any) {
    super()
  }

  async start(app: NappJS, ...args: any[]): Promise<void> {
    if (typeof this.module.start === 'function') {
      return this.module.start()
    } else if (typeof this.module === 'function') {
      return this.module(...args)
    }
  }

  async stop(app: NappJS, ...args: any[]): Promise<void> {
    if (typeof this.module.stop === 'function') {
      return this.module.stop(...args)
    } 
  }
}
