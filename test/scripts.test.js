const assert = require("assert");

describe("scripts", () => {
  const napp = require("../index").NewNappJS();

  before(async () => {
    await napp.load();
    await napp.start();
  });

  it("should run test script", async () => {
    const result = await napp.runScript("test", "aaa");
    assert.equal(result, "hello from script aaa");
  });

  it("should run test2 script", async () => {
    const result = await napp.runScript("test2", "aaabbb");
    assert.equal(result, "hello from script aaabbb");
  });

  it("should run plugin test script", async () => {
    const result = await napp.runScript("test/test");
    assert.equal(result, "hello from plugin script");
  });
});
