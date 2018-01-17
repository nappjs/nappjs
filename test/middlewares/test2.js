const assert = require("assert");
const NappJSService = require("../../index").NappJSService;

class MiddlewareTest2 extends NappJSService {
  constructor(test) {
    super();
    this.middleware_started = false;
    this.test = test;
  }

  start(napp) {
    this.middleware_started = this.test.getBlah();
  }
}
MiddlewareTest2.dependencies = ["test"];

module.exports = MiddlewareTest2;
