const Router = require("express").Router;

const test = new Router();

test.get("/test", (req, res, next) => {
  res.send("hello world");
});

module.exports = test;
