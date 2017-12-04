const Router = require("express-promise-router");
const cors = require("cors");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares");
const database = require("./database");
const plugins = require("./plugins");

const api = app => {
  const router = Router();

  app.use(router);

  app.locals.database = database;

  router.use(bodyParser.json());
  router.use(
    cors({
      allowedHeaders: "Content-Range,Content-Type,Range,Authorization",
      exposedHeaders: "Content-Range"
    })
  );

  router.use(app.locals.database.middleware());

  for (let key in middlewares) {
    let middleware = middlewares[key];
    if (typeof middleware === "function") {
      middleware(router);
    } else {
      console.log(`middleware ${key} is not a function (${typeof middleware})`);
    }
  }

  for (let key in plugins) {
    let plugin = plugins[key];
    if (typeof plugin === "function") {
      plugin(router);
    } else {
      console.log(`plugin ${key} is not a function (${typeof plugin})`);
    }
  }

  router.use((err, req, res, next) => {
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
