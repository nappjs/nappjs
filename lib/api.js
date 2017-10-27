const Router = require("express").Router;
const CoreDataRest = require("js-core-data-rest");
const CoreDataGraphql = require("js-core-data-graphql");
const GraphQLplayground = require("graphql-playground/middleware").express;

module.exports = database => {
  let app = new Router();

  app.post("/graphql", CoreDataGraphql.graphql(database));
  app.get("/graphql", GraphQLplayground({ endpoint: "/graphql" }));
  app.use(CoreDataRest.rest(database));

  return app;
};
