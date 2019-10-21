
const schedule = require('node-schedule');
const sites = require('./sites/index');
const store = require('./store');

schedule.scheduleJob('*/20 * * * *', async () => {
  sites.run()
});

sites.run().then(() => {
  console.log('run success')
  sites.run();
})
