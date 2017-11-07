const fs = require("fs");
const path = require("path");
const inflection = require("inflection");

const seedPath = path.resolve("./seeds");

const importSeed = async (db, seed) => {
  return db.seed.run(path.join(seedPath, seed));
};

module.exports = {
  run: importSeed
};
