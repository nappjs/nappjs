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

  async register(app: NappJS) {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.register === 'function') {
      await this.module.register(app)
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

  async stop(app: NappJS): Promise<any> {
    assert.ok(this.module, 'module not loaded')
    if (typeof this.module.stop === 'function') {
      return Promise.resolve(this.module.start(app))
    }
  }
}