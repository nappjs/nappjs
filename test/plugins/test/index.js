module.exports = app => {
  app.get("/plugin-test", (req, res, next) => {
    res.send("hello world from plugin");
  });
};
