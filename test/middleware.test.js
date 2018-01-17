const assert = require("assert");

const napp = require("../lib").NewNappJS();

describe("middleware", () => {
  before(async () => {
    await napp.start();
  });

  it("should load", () => {
    let middleware = napp.getService("test");
    let middleware2 = napp.getService("test2");
    assert.ok(middleware);
    assert.ok(middleware2);
    assert.equal(middleware.middleware_started, "foo");
    assert.equal(middleware2.middleware_started, "blah");
    assert.equal(middleware2.test, middleware);
  });
});
