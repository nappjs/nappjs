module.exports.NewNappJS = config => {
  const NappJS = require("./lib/napp").NappJS;
  return new NappJS();
};

module.exports.NappJS = require("./lib/napp").NappJS;
module.exports.NappJSModule = require("./lib/model").NappJSModule;
