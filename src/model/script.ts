import { NappJS } from '../../';
import { NappJSModule, NappJSScriptContainer } from './module';

export const createNappJSScript = (name: string, path: string): NappJSScriptContainer => {
  const module = require(path);
  let defaultModule = module.default || module;
  if (!(defaultModule.prototype instanceof NappJSScript)) {
    defaultModule = new NappJSObjectScript(defaultModule)
  }
  return new NappJSScriptContainer(name, path, defaultModule);
};

export class NappJSScript extends NappJSModule {
  async run(app: NappJS, ...args: any[]): Promise<void> {}
}

class NappJSObjectScript extends NappJSScript {
  module: any

  constructor(module: any) {
    super()
    this.module = module
  }

  async run(napp: NappJS, ...args: any[]): Promise<void> {
    if (typeof this.module.run === 'function') {
      return this.module.run(napp, ...args)
    } else if (typeof this.module === 'function') {
      return this.module(napp, ...args)
    }
  }
}