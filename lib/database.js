const fs = require("fs");
const path = require("path");
const CoreData = require("js-core-data");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite:///tmp/database.tmp";
const database = new CoreData(DATABASE_URL, { logging: false });

const schemaPath = path.resolve("./schema/");
let files = [];

if (fs.existsSync(schemaPath)) {
  console.log("loading schema files from:", schemaPath);
  files = fs.readdirSync(schemaPath);
}

const createModelVersionName = filePath => {
  return path.basename(filePath).replace(".yml", "");
};

if (files.length === 0) {
  throw new Error("no schema found");
}

files.forEach(file => {
  const version = createModelVersionName(file);
  console.log("installing version:", version);

  database.createModelFromYaml(
    fs.readFileSync(path.join(schemaPath, file)),
    {},
    version
  );
});
let modelVersion = createModelVersionName(files[files.length - 1]);
database.setModelVersion(modelVersion);

module.exports = database;
