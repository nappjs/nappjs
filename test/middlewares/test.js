module.exports = app => {
  app.get("/test", (req, res, next) => {
    res.send("hello world");
  });

  app.get("/context-test", (req, res, next) => {
    req.context
      .getObjects("Company")
      .then(data => {
        res.send(data);
      })
      .catch(next);
  });

  app.get("/me", async (req, res, next) => {
    try {
      const payload = await req.jwt.payload();
      res.send(payload);
    } catch (e) {
      next(e);
    }
  });
};
