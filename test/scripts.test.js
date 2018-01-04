const assert = require("assert");

describe("scripts", () => {
  const napp = require("../index")();

  before(async () => {
    await napp.load();
    await napp.start();
  });

  it("should run test script", async () => {
    const result = await napp.runScript("test", "aaa");
    assert.equal(result, "hello from script aaa");
  });

  it("should run plugin test script", async () => {
    const result = await napp.runScript("test/test");
    assert.equal(result, "hello from plugin script");
  });
});
