const assert = require('assert');
const NappJSService = require('../../lib').NappJSService;

class MiddlewareTest extends NappJSService {
  constructor() {
    super();
    this.middleware_started = false;
  }

  start(napp) {
    this.middleware_started = 'foo';
  }

  getBlah() {
    return 'blah';
  }

  async getHealthCheckData() {
    return { test: 'ok' };
  }
}

module.exports = MiddlewareTest;
