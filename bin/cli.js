#! /usr/bin/env node
const program = require("commander");

program.version(require("../package.json").version);
//  .option('-p, --peppers', 'Add peppers')
//  .option('-P, --pineapple', 'Add pineapple')
//  .option('-b, --bbq-sauce', 'Add bbq sauce')
//  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

program.command("start", "start application");
//   .action(cmd => {
//     console.log("start");
//   });

program.parse(process.argv);
