const Router = require("express").Router;
const cors = require("cors");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares");
const plugins = require("./plugins");

const api = database => {
  let app = new Router();

  app.use(bodyParser.json());
  app.use(
    cors({
      allowedHeaders: "Content-Range,Content-Type,Range,Authorization",
      exposedHeaders: "Content-Range"
    })
  );

  app.use(database.middleware());

  app.use((req, res, next) => {
    req.database = database;
    next();
  });

  for (let key in plugins) {
    let plugin = plugins[key];
    if (typeof plugin === "function") {
      app.use(plugin);
    } else {
      console.log(`middleware ${key} is not a function (${typeof plugin})`);
    }
  }

  for (let key in middlewares) {
    let middleware = middlewares[key];
    if (typeof middleware === "function") {
      app.use(middleware);
    } else {
      console.log(`middleware ${key} is not a function (${typeof middleware})`);
    }
  }

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 400).send(err.message);
  });

  return app;
};

const rest = require("./api.rest");
const graphql = require("./api.graphql");
const jwt = require("./api.jwt");

module.exports = {
  api,
  rest,
  graphql,
  jwt,
  middleware: database => {
    const r = new Router();

    const restApiPath = process.env.REST_API_PATH || "/";

    r.use(jwt(database));
    r.use(api(database));
    r.use("/graphql", graphql(database));
    r.use(restApiPath, rest(database));

    r.use((req, res, next) => {
      if (!res.headersSent) {
        res.status(404).send(`Cannot ${req.method} ${req.path}`);
      }
      next();
    });

    return r;
  }
};
