const Router = require("express").Router;
const CoreDataGraphql = require("js-core-data-graphql");
const { expressPlayground } = require("graphql-playground-middleware");
const bodyParser = require("body-parser");

module.exports = database => {
  let app = new Router();

  app.use(bodyParser.json());

  app.post("/", CoreDataGraphql.graphql(database));
  app.get("/", expressPlayground({ endpoint: "graphql" }));

  return app;
};
