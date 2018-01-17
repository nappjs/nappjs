import * as findNodeModules from 'find-node-modules';
import * as fs from 'fs';
import * as path from 'path';

import { createNappJSService, NappJSServiceContainer } from './model';


export const getPluginsPaths = () => {
  const pluginsPath = path.resolve(process.env.PLUGINS_PATH || "./plugins/");

  let paths: string[] = [];
  if (fs.existsSync(pluginsPath)) {
    paths = fs.readdirSync(pluginsPath);
    paths = paths.map(file => {
      return path.join(pluginsPath, file);
    });
  }

  // search plugins with by prefix in local/global node_modules
  let nodeModulesPaths = findNodeModules(null);
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
      paths.push(match);
    }
  }
  return paths
}

export const loadPlugins = () => {
  console.log("searching for plugins...")
  
  let paths = getPluginsPaths()
  let plugins: NappJSServiceContainer[] = []
  paths.forEach(file => {
    const pluginName = path.basename(file);
    plugins.push(createNappJSService(pluginName,file))
  });

  if (plugins.length === 0) {
    console.log("no plugins found");
  } else {
    console.log("plugins found:", plugins.map(x => x.name).join(', '));
  }
  return plugins
}

