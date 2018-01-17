const assert = require("assert");
const NappJSService = require("../../index").NappJSService;

class MiddlewareTest extends NappJSService {
  constructor() {
    super();
    this.middleware_started = false;
  }

  start(napp) {
    this.middleware_started = "foo";
  }

  getBlah() {
    return "blah";
  }
}

module.exports = MiddlewareTest;
