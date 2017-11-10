const assert = require("assert");
const moment = require("moment");

const app = require("../index");

describe("scripts", () => {
  beforeEach(() => {
    return app.database.syncSchema({ force: true });
  });
  after(() => {
    return app.database.closeAllConnections();
  });

  it("should run test seed", async () => {
    const result = await app.scripts.run(app.database, "test");
    assert.equal(result, "this is test: v0.0.2");
  });
});
