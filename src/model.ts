import { NappJS } from './napp';

export const createNappJSModule = (name: string, path: string): NappJSModule => {
  const module = require(path)
  if (module.prototype instanceof NappJSModule) {
    let instance = new module(name, path, null)
    return instance
  }
  return new NappJSModule(name, path, module)
}

export class NappJSModule {
  public name: string
  private path: string
  protected module: any
  constructor(name: string, path: string, module: any | null) {
    this.name = name
    this.path = path;
    this.module = module;
  }

  async load(app: NappJS): Promise<any> {
    // if (!this.module) {
    //   this.module = require(this.path)  
    // }
  }

  async preRegister(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.preRegister === 'function') {
      await this.module.preRegister(app, ...args)
    }
  }

  async register(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.register === 'function') {
      await this.module.register(app, ...args)
    }
  }

  async postRegister(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.postRegister === 'function') {
      await this.module.postRegister(app, ...args)
    }
  }

  async preStart(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.preStart === 'function') {
      return Promise.resolve(this.module.preStart(app, ...args))
    }
  }

  async start(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.start === 'function') {
      return Promise.resolve(this.module.start(app, ...args))
    } else if (this.module && typeof this.module === 'function'){
      return Promise.resolve(this.module(app, ...args))
    }
  }

  async postStart(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.postStart === 'function') {
      return Promise.resolve(this.module.postStart(app, ...args))
    }
  }

  async preStop(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.preStop === 'function') {
      return Promise.resolve(this.module.preStop(app, ...args))
    }
  }

  async stop(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.stop === 'function') {
      return Promise.resolve(this.module.stop(app, ...args))
    }
  }

  async postStop(app: NappJS, ...args: any[]): Promise<void> {
    // assert.ok(this.module, 'module not loaded')
    if (this.module && typeof this.module.postStop === 'function') {
      return Promise.resolve(this.module.postStop(app, ...args))
    }
  }
}