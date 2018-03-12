const assert = require('assert');

const napp = require('../lib').NewNappJS();

describe('healthcheck', () => {
  before(async () => {
    await napp.start();
  });

  it('should fetch healthcheck data', async () => {
    let data = await napp.getHealthCheckData();
    assert.equal(data.test, 'ok');
    assert.equal(data.test2, 'blah');
  });
});
