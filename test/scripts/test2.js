const NappJSScript = require("../../lib").NappJSScript;

class ScriptTest2 extends NappJSScript {
  async run(app, arg1) {
    return `hello from script ${arg1}`;
  }
}

module.exports = ScriptTest2;
