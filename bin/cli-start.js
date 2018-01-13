#! /usr/bin/env node
require("../lib/newrelic");
const program = require("commander");
const getPort = require("get-port");
const exitHook = require("exit-hook");

const start = async port => {
  port = await getPort({ port: port });

  const napp = require("../index").NewNappJS();

  try {
    console.log("loading...");
    await napp.load();
    console.log("starting...");
    await napp.start();
    console.log("...started");
  } catch (err) {
    console.log(`failed to start ${err}`);
  }

  exitHook(async function() {
    console.log("detected exit, stopping server...");
    await napp.stop();
    console.log("...stopped");
  });
};

program.option("-p, --port [port]", "specify port").parse(process.argv);

start(process.env.PORT || program.port || 80);
