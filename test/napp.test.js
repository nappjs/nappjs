const assert = require("assert");

const napp = require("../index").NewNappJS();

describe("napp", () => {
  before(async () => {
    await napp.load();
  });

  it("should fetch plugins", () => {
    assert.ok(napp.getService("test-plugin"));
  });
  it("should fetch middlewares", () => {
    assert.ok(napp.getService("test"));
  });
  it("should fetch scripts", () => {
    assert.ok(napp.getService("test-plugin"));
    assert.ok(napp.getScript("test-plugin/test"));
  });
});
