import * as assert from 'assert';
import { NappJSService, NappJS } from '../../lib';

export default class MiddlewareTest3 extends NappJSService {
  blah: string;

  constructor(test: string) {
    super();
    this.blah = `hello ${test}`;
  }

  async start(napp: NappJS, ...args: any[]): Promise<void> {
    this.blah += '...we just started';
  }
}
