const Router = require("express").Router;

const test = new Router();

test.get("/plugin-test", (req, res, next) => {
  res.send("hello world from plugin");
});

module.exports = test;
