#! /usr/bin/env node
const program = require("commander");

const database = require("../lib/database");
const seed = require("../lib/seed");

const _seed = async type => {
  console.log("seeding database...");
  try {
    await seed.import(database, type);
    console.log("database seeded");
  } catch (e) {
    console.log("failed to seed database", e);
  } finally {
    console.log("draining database connections...");
    database.closeAllConnections();
  }
};

_seed("startup");
