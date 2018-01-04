module.exports = {
  register: app => {
    app.locals.plugin_registered = "blah";
  },
  start: app => {
    app.locals.plugin_started = "foo";
  }
};
