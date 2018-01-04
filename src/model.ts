import * as assert from 'assert'
import { NappJS } from './napp'

export class NappJSModule {
  public name: string
  private path: string
  protected module: any
  constructor(name: string, path: string) {
    this.name = name
    this.path = path;
  }

  async load(app: NappJS): Promise<any> {
    if (!this.module) {
      this.module = require(this.path)  
    }
  }

  async preRegister(app: NappJS, ...args: any[]) {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.preRegister === 'function') {
      await this.module.preRegister(app, ...args)
    }
  }

  async register(app: NappJS, ...args: any[]) {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.register === 'function') {
      await this.module.register(app, ...args)
    }
  }

  async postRegister(app: NappJS, ...args: any[]) {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.postRegister === 'function') {
      await this.module.postRegister(app, ...args)
    }
  }

  async preStart(app: NappJS, ...args: any[]): Promise<any> {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.preStart === 'function') {
      return Promise.resolve(this.module.preStart(app, ...args))
    }
  }

  async start(app: NappJS, ...args: any[]): Promise<any> {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.start === 'function') {
      return Promise.resolve(this.module.start(app, ...args))
    } else if (typeof this.module === 'function'){
      return Promise.resolve(this.module(app, ...args))
    }
  }

  async postStart(app: NappJS, ...args: any[]): Promise<any> {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.postStart === 'function') {
      return Promise.resolve(this.module.postStart(app, ...args))
    }
  }

  async preStop(app: NappJS, ...args: any[]): Promise<any> {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.preStop === 'function') {
      return Promise.resolve(this.module.preStop(app, ...args))
    }
  }

  async stop(app: NappJS, ...args: any[]): Promise<any> {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.stop === 'function') {
      return Promise.resolve(this.module.stop(app, ...args))
    }
  }

  async postStop(app: NappJS, ...args: any[]): Promise<any> {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.postStop === 'function') {
      return Promise.resolve(this.module.postStop(app, ...args))
    }
  }
}