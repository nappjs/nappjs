const api = require("./lib/api");
const database = require("./lib/database");
const middlewares = require("./lib/middlewares");
const seed = require("./lib/seed");

module.exports = {
  api,
  database,
  middlewares,
  seed
};
