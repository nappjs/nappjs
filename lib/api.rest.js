const Router = require("express").Router;
const CoreDataRest = require("js-core-data-rest");
const bodyParser = require("body-parser");

module.exports = database => {
  let app = new Router();

  app.use(bodyParser.json());

  app.use(CoreDataRest.rest(database));

  return app;
};
