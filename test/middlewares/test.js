const assert = require("assert");

module.exports = {
  register: app => {
    app.locals.middleware_registered = "blah";
  },
  start: app => {
    app.locals.middleware_started = "foo";
  }
};
