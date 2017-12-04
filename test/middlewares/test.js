const assert = require("assert");

module.exports = app => {
  assert.ok(app.locals);

  app.get("/test", (req, res, next) => {
    res.send(req.app.locals.database ? "hello world" : "bad day");
  });

  app.get("/context-test", (req, res, next) => {
    return req.context.getObjects("Company").then(data => {
      res.send(data);
    });
  });

  app.get("/me", async (req, res) => {
    const payload = await req.jwt.payload();
    res.send(payload);
  });
};
