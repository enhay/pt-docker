
const schedule = require('node-schedule');
const sites = require('./sites/index');

schedule.scheduleJob('*/20 * * * *', async () => {
  sites.run()
});