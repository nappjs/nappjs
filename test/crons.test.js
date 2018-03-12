const assert = require('assert');

const napp = require('../lib').NewNappJS();

const delay = duration => {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
};

describe('crons', () => {
  before(async () => {
    await napp.load();
    await napp.start();
  });

  it('should start cron script', async () => {
    const cron = await napp.startCron(
      '* * * * * *',
      'Europe/Prague',
      'counter'
    );
    return delay(2500).then(async () => {
      cron.stop();
      let res = await napp.runScript('counter');
      assert.equal(res, 2);
    });
  });
});
