const NappJSModule = require("../../index").NappJSModule;

class ScriptTest2 extends NappJSModule {
  async start(app, arg1) {
    return `hello from script ${arg1}`;
  }
}

module.exports = ScriptTest2;
