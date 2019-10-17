const config = require('../config.js');
const ourbits = require('./ourbits');
const ttg = require('./ttg');
const mteam = require('./mteam');

async function run() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  

  try {
    await browser.close();
  } catch (error) {
    // 重启node进程已关闭browser
    process.exit(-1)
  }
}

module.exports = { run }