const fs = require("fs");
const path = require("path");
const inflection = require("inflection");

const scriptsPath = path.resolve("./scripts");

const runScript = async (db, script) => {
  const scriptPath = path.join(scriptsPath, script + ".js");
  if (!fs.existsSync(scriptPath))
    throw new Error(`script ${script} doesn't exist`);
  return Promise.resolve(require(scriptPath)(db));
};

module.exports = {
  run: runScript
};
