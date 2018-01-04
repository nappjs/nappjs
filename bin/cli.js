#! /usr/bin/env node
const program = require("commander");

program.version(require("../package.json").version);

program.command("start", "start application");
program.command("run", "run script");

program.parse(process.argv);
