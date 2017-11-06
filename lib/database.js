const fs = require("fs");
const path = require("path");
const CoreData = require("js-core-data");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite://:memory:";
const database = new CoreData(DATABASE_URL, { logging: false });

const schemaPath = path.resolve("./schema/");

database.schema.load(schemaPath);

module.exports = database;
