
const schedule = require('node-schedule');
const sites = require('./sites/index');
const downloder = require('./util/down.js');

const cron = process.env.cron || '*/60 * * * *'

schedule.scheduleJob(cron, async () => {
  sites.run()
});


sites.run().then(() => {
  console.log('run success')
})
