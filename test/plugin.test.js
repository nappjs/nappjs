const assert = require("assert");

const napp = require("../index")();

describe("plugin", () => {
  before(async () => {
    await napp.load();
    await napp.start();
  });

  it("should load", () => {
    assert.equal(napp.locals.plugin_registered, "blah");
    assert.equal(napp.locals.plugin_started, "foo");
  });
});
