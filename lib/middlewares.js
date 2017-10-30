const fs = require("fs");
const path = require("path");

console.log("loading middlewares");
const middlewarePath = path.resolve("./middleware/");
const files = fs.readdirSync(middlewarePath);

var middlewares = {};
files.forEach(file => {
  console.log("middleware", file);
  const filePath = path.join(middlewarePath, file);
  middlewares[file] = require(filePath);
});

module.exports = middlewares;
