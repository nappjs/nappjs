const Router = require("express").Router;
const CoreDataRest = require("js-core-data-rest");
const CoreDataGraphql = require("js-core-data-graphql");
const { expressPlayground } = require("graphql-playground-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares");

module.exports = database => {
  let app = new Router();

  app.use(bodyParser.json());
  app.use(
    cors({
      allowedHeaders: "Content-Range,Content-Type,Range,Authorization",
      exposedHeaders: "Content-Range"
    })
  );

  app.use((req, res, next) => {
    req.database = database;
    next();
  });

  for (let key in middlewares) {
    let middleware = middlewares[key];
    if (typeof middleware === "function") {
      app.use(middleware);
    } else {
      console.log(`middleware ${key} is not a function (${typeof middleware})`);
    }
  }

  app.post("/graphql", CoreDataGraphql.graphql(database));
  app.get("/graphql", expressPlayground({ endpoint: "graphql" }));
  app.use(CoreDataRest.rest(database));

  return app;
};
