const Router = require("express").Router;

const test = new Router();

test.get("/test", (req, res, next) => {
  res.send("hello world");
});

test.get("/context-test", (req, res, next) => {
  req.context
    .getObjects("Company")
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

module.exports = test;
