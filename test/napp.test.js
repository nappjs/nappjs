const assert = require("assert");

const napp = require("../index").NewNappJS();

describe("napp", () => {
  it("should fetch plugins", () => {
    assert.ok(napp.findPlugin("test"));
  });
  it("should fetch middlewares", () => {
    assert.ok(napp.findMiddleware("test"));
  });
  it("should fetch scripts", () => {
    assert.ok(napp.findScript("test"));
    assert.ok(napp.findScript("test/test"));
  });
});
