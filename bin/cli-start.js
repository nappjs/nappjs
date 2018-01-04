#! /usr/bin/env node
require("../lib/newrelic");
const program = require("commander");
const getPort = require("get-port");
const exitHook = require("exit-hook");

const start = async port => {
  port = await getPort({ port: port });

  const napp = require("../index")();

  let app = express();

  api.middleware(app);

  console.log("starting...");
  try {
    await napp.start();
    console.log("...started");
  } catch (err) {
    console.log(`failed to start ${err}`);
  }

  exitHook(function() {
    console.log("detected exit, stopping server");
    napp.stop();
  });
};

program.option("-p, --port [port]", "specify port").parse(process.argv);

start(process.env.PORT || program.port || 80);
