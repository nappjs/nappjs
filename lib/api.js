const Router = require("express").Router;
const CoreDataRest = require("js-core-data-rest");
const CoreDataGraphql = require("js-core-data-graphql");
const GraphQLplayground = require("graphql-playground/middleware").express;

const middlewares = require("./middlewares");

module.exports = database => {
  let app = new Router();

  for (let key in middlewares) {
    let middleware = middlewares[key];
    if (typeof middleware === "function") {
      app.use(middleware);
    } else {
      console.log(`middleware ${key} is not a function (${typeof middleware})`);
    }
  }

  app.post("/graphql", CoreDataGraphql.graphql(database));
  app.get("/graphql", GraphQLplayground({ endpoint: "/graphql" }));
  app.use(CoreDataRest.rest(database));

  return app;
};
