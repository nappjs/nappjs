const fs = require("fs");
const path = require("path");
const findNodeModules = require("find-node-modules");

console.log("loading plugins");
const pluginsPath = path.resolve(process.env.PLUGINS_PATH || "./plugins/");

var plugins = {};
let files = [];
if (fs.existsSync(pluginsPath)) {
  files = fs.readdirSync(pluginsPath);
  files = files.map(file => {
    return path.join(pluginsPath, file);
  });
}

// search plugins with by prefix in local/global node_modules
let nodeModulesPaths = findNodeModules();
if (process.env.LOAD_GLOBAL_PLUGINS) {
  nodeModulesPaths.push(require("global-modules"));
}
for (let pluginsPath of nodeModulesPaths) {
  let matches = fs.readdirSync(pluginsPath).filter(name => {
    return name.indexOf("nappjs-") === 0;
  });
  for (let match of matches) {
    match = path.join(pluginsPath, match);
    if (!path.isAbsolute(match)) {
      match = path.join(process.cwd(), match);
    }
    files.push(match);
  }
}

if (files.length === 0) {
  console.log("no plugins found");
}

files.forEach(file => {
  const pluginName = path.basename(file);
  console.log("plugin", pluginName);
  plugins[pluginName] = require(file);
});

module.exports = plugins;
