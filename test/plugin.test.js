const assert = require("assert");

const napp = require("../lib").NewNappJS();

describe("plugin", () => {
  before(async () => {
    await napp.start();
  });

  it("should load", () => {
    let plugin = napp.getService("test-plugin");
    assert.equal(plugin.started, "blah...");
  });
});
