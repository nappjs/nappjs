const assert = require("assert");
const supertest = require("supertest");
const express = require("express");

const app = require("../index");
const api = express();
api.use("/", app.api(app.database));

const test = supertest(api);

describe("middleware", () => {
  beforeEach(() => {
    return require("./seed-data")(app.database);
  });
  after(() => {
    return app.database.closeAllConnections();
  });

  it("should fetch endpoint", () => {
    return test
      .get("/test")
      .expect(200)
      .expect(res => {
        assert.equal(res.text, "hello world");
      });
  });
});
