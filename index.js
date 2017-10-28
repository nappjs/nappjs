const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getPort = require("get-port");
const exitHook = require("exit-hook");

const database = require("./lib/database");
const api = require("./lib/api");

let app = express();

app.use(
  cors({
    allowedHeaders: "Content-Range,Content-Type,Range,Authorization",
    exposedHeaders: "Content-Range"
  })
);
app.use(bodyParser.json());
app.use(api(database));

const start = async () => {
  let port = process.env.PORT || 80;
  port = await getPort({ port: port });
  if (process.env.NODE_ENV !== "production") {
    console.log("migating/syncing database");
    await database.syncSchema({
      automigration: true,
      ignoreMissingVersion: true
    });
  }

  console.log("starting api");
  const server = app.listen(port, err => {
    console.log(`listening on ${port}, err: ${err}`);
  });

  exitHook(function() {
    server.close();
  });
};

start();