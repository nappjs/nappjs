const assert = require("assert");
const supertest = require("supertest");
const express = require("express");

const app = require("../index")();
const api = express();
api.use("/", app.api.middleware(app.database));

const test = supertest(api);

describe("api jwt", () => {
  beforeEach(() => {
    return require("./seed-data")(app.database);
  });
  after(() => {
    return app.database.closeAllConnections();
  });

  it("should fetch token payload", () => {
    return test
      .get(
        "/me?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZX0.sSLkTTxG670_tv9PCYI3xBOlyGrmZLkROqO2QBOYRto"
      )
      .expect(200)
      .expect(res => {
        assert.deepEqual(res.body, {
          sub: "123456",
          name: "John Doe",
          admin: true
        });
      });
  });

  it("should fail to fetch invalid token payload", () => {
    return test
      .get("/me?access_token=blah")
      .expect(401)
      .expect(res => {
        assert.equal(res.text, "Invalid token");
      });
  });
});
