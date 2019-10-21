const Promise = require('bluebird');
const puppeteer = require('puppeteer');
const config = require('../config.js');
const Ourbits = require('./ourbits');
const TTG = require('./ttg');
const Mteam = require('./mteam');
let browserWSEndpoint;


async function run() {
  const browser = await getBrowser();
  const ps = Object.keys(config).map((site) => {
    return browser.newPage().then((page) => {
      return genSiteIns(site, page)
    })
  })
  const siteRunner = ps.map((item) => {
    return item.then((site) => {
      return site.run()
    }).catch((err) => {
      console.log(err);
    })
  })
  await Promise.all(siteRunner)
  
  try {
    await browser.disconnect();
  } catch (error) {
    await browser.close();
    process.exit(-1)
  }
}

async function genSiteIns(site, page) {
  const siteConf = config[site];
  switch (site) {
    case 'ourbits':
      return new Ourbits(siteConf, page);
    case 'mteam':
      return new Mteam(siteConf, page);
    case 'ttg':
      return new TTG(siteConf, page);
    default:
      return new EmptySite(siteConf, page);
  }
}

async function getBrowser() {
  let browser;
  if (!browserWSEndpoint) {
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1280, height: 800 },
      //headless: false,
    });
    browserWSEndpoint = browser.wsEndpoint();
    return browser;
  }
  try {
    browser = await puppeteer.connect({ browserWSEndpoint })
    return browser;
  } catch (error) {
    console.log(error);
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1280, height: 800 },
      //headless: false,
    });
    browserWSEndpoint = browser.wsEndpoint();
    return browser;
  }
}


class EmptySite {
  constructor(config, page) {
    this.page = page;
  }
  async run() {
    await this.page.close();
  }
}


module.exports = { run }