const fs = require("fs");
const path = require("path");

console.log("loading middlewares");
const middlewarePath = path.resolve("./middleware/");

var middlewares = {};
let files = [];
if (fs.existsSync(middlewarePath)) {
  files = fs.readdirSync(middlewarePath);
}

if (files.length === 0) {
  console.log("no middlewares found");
}

files.forEach(file => {
  console.log("middleware", file);
  const filePath = path.join(middlewarePath, file);
  middlewares[file] = require(filePath);
});

module.exports = middlewares;
