module.exports.NewNappJS = config => {
  const NappJS = require("./lib/napp").NappJS;
  return new NappJS();
};

module.exports.NappJS = require("./lib/napp").NappJS;
module.exports.NappJSService = require("./lib/model").NappJSService;
module.exports.NappJSScript = require("./lib/model").NappJSScript;
