const assert = require("assert");

const napp = require("../index")();

describe("middleware", () => {
  before(async () => {
    await napp.load();
    await napp.start();
  });

  it("should load", () => {
    assert.equal(napp.locals.middleware_registered, "blah");
    assert.equal(napp.locals.middleware_started, "foo");
    assert.equal(napp.locals.middleware2_registered, "blah2");
    assert.equal(napp.locals.middleware2_started, "foo2");
  });
});
