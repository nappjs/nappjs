#! /usr/bin/env node
const program = require('commander');
const exitHook = require('exit-hook');
const prettyCron = require('prettycron');

const _run = async (crontime, script, args) => {
  const napp = require('../lib').NewNappJS();

  let timezone = program.timezone;
  await napp.load();

  console.log(
    `starting cron ${prettyCron.toString(
      crontime,
      true
    )} (timezone ${timezone || 'default'}) ${script}...`
  );
  try {
    let cron = await napp.startCron(crontime, timezone, script, ...args);

    exitHook(async function() {
      console.log('detected exit, stopping cron...');
      cron.stop();
      console.log('...stopped');
    });
  } catch (e) {
    console.log(`failed to start cron ${script}`, e);
  }
};

program
  .arguments('<cron> <script> [args...]')
  .option('-z, --timezone <n>', 'Cron timezone')
  .action(_run)
  .parse(process.argv);
