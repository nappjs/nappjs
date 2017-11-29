const Router = require("express").Router;
const cors = require("cors");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares");
const database = require("./database");
const plugins = require("./plugins");

const api = app => {
  app.locals.database = database;

  app.use(bodyParser.json());
  app.use(
    cors({
      allowedHeaders: "Content-Range,Content-Type,Range,Authorization",
      exposedHeaders: "Content-Range"
    })
  );

  app.use(app.locals.database.middleware());

  for (let key in plugins) {
    let plugin = plugins[key];
    if (typeof plugin === "function") {
      plugin(app);
    } else {
      console.log(`middleware ${key} is not a function (${typeof plugin})`);
    }
  }

  for (let key in middlewares) {
    let middleware = middlewares[key];
    if (typeof middleware === "function") {
      middleware(app);
    } else {
      console.log(`middleware ${key} is not a function (${typeof middleware})`);
    }
  }

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 400).send(err.message);
  });
};

module.exports = {
  api,
  middleware: app => {
    api(app);

    app.use((req, res, next) => {
      if (!res.headersSent) {
        res.status(404).send(`Cannot ${req.method} ${req.path}`);
      }
      next();
    });
  }
};
