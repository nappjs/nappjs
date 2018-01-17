const assert = require("assert");
const NappJSService = require("../../../index").NappJSService;

class PluginTest extends NappJSService {
  constructor(test) {
    super();
    this.started = false;
    this.test = test;
  }

  start(napp) {
    this.started = this.test.getBlah() + "...";
  }
}
PluginTest.dependencies = ["test"];

module.exports = PluginTest;
