const puppeteer = require('puppeteer');

const schedule = require('node-schedule');
const sites = require('./sites/index');

schedule.scheduleJob('*/20 * * * *', async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  await sites.run(browser);
  try {
    await browser.close();
  } catch (error) {
    // 重启node进程已关闭browser
    process.exit(-1)
  }
});