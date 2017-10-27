const fs = require("fs");
const path = require("path");
const CoreData = require("js-core-data");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite://:memory:";
const database = new CoreData(DATABASE_URL, { logging: false });

const schemaPath = path.join(__dirname, "/../schema/");

console.log("loading schema files from:", schemaPath);
const files = fs.readdirSync(schemaPath);

files.forEach(file => {
  const version = path.basename(file);
  console.log("installing version:", version);

  database.createModelFromYaml(
    fs.readFileSync(path.join(schemaPath, file)),
    {},
    version
  );
});
database.setModelVersion(path.basename(files[files.length - 1]));

module.exports = database;
