#! /usr/bin/env node
const program = require("commander");

const _run = async (script, args) => {
  const napp = require("../index")();

  await napp.load();

  console.log(`running script ${script}...`);
  try {
    await napp.runScript(script, ...args);
  } catch (e) {
    console.log(`failed to run ${script}`, e);
  }
};

program
  .arguments("<script> [args...]")
  .action(_run)
  .parse(process.argv);
