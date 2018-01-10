module.exports.NappJS = config => {
  const NappJS = require("./lib/napp").NappJS;
  return new NappJS();
};

module.exports.NappJSModule = require("./lib/model").NappJSModule;
