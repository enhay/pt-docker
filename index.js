
const schedule = require('node-schedule');
const config = require('./config');
const sites = require('./sites/index');

const cron = config.cron || 20;

schedule.scheduleJob(`*/${cron} * * * *`, async () => {
  sites.run()
});

sites.run().finally((err) => {
  if (err){
    console.log(err);
  }
})