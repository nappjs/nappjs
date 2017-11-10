const fs = require("fs");
const path = require("path");

console.log("loading plugins");
const pluginsPath = path.resolve(process.env.PLUGINS_PATH || "./plugins/");

var plugins = {};
let files = [];
if (fs.existsSync(pluginsPath)) {
  files = fs.readdirSync(pluginsPath);
}

if (files.length === 0) {
  console.log("no plugins found");
}

files.forEach(file => {
  console.log("plugin", file);
  const pluginPath = path.join(pluginsPath, file);
  plugins[file] = require(pluginPath);
});

module.exports = plugins;
