const assert = require("assert");
const NappModule = require("../lib");
const NappJSService = NappModule.NappJSService;

class Service1 extends NappJSService {
  getName() {
    return "s1";
  }
}
class Service2 extends NappJSService {
  constructor(s1) {
    super();
    this.s1 = s1;
  }
  test() {
    return this.s1.getName();
  }
}

const napp = NappModule.NewNappJS();

describe("di", () => {
  it("should add/get service", async () => {
    napp.addService("s1", Service1);

    let service = napp.getService("s1");
    assert.ok(service);
    assert.equal(service, napp.getService("s1"));
  });

  it("should handle dependencies", async () => {
    napp.addService("s1", Service1);
    napp.addService("s2", Service2, "s1");

    let service = napp.getService("s2");
    assert.ok(service);
    assert.equal(service, napp.getService("s2"));
    assert.ok(service.test());
  });

  it("should fail to inject invalid service", async () => {
    assert.throws(() => {
      napp.getService("s3");
    });
  });
});
