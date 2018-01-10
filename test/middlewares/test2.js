const assert = require("assert");
const NappJSModule = require("../../index").NappJSModule;

class MiddlewareTest2 extends NappJSModule {
  register(app) {
    app.locals.middleware2_registered = "blah2";
  }
  start(app) {
    app.locals.middleware2_started = "foo2";
  }
}

module.exports = MiddlewareTest2;
