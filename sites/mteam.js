
const debug = require('debug')("pt:mteam");
const { downOnce } = require('../util/down');
const { LoginBase } = require('./login');


class Mteam extends LoginBase {
  constructor(config, page) {
    super(config, page)
  }
  async run() {
    try {
      await this.login()
      await page.screenshot({
        path: 'mteam.png',
        fullPage: false,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    const ids = await this.getFreeTorrent();
    const links = this.genDownLink(...ids);
    console.log('mt', links);
    downOnce(links);
  }
  async getFreeTorrent() {
    await this.page.waitFor('table.torrents');
    const doms = await this.page.$$('.torrentname .embedded:first-child');
    const evalArr = doms.slice(0, config.count).map((item) => {
      return this.page.evaluate(e => e.innerHTML, item).catch((err) => {
        return '';
      })
    });
    const domHtmls = await Promise.all(evalArr).catch((err) => {
      return [];
    });
    const torrentids = [];
    domHtmls.forEach((innerHtml) => {
      if (!innerHtml.match('alt="Free"')) {
        return
      }
      const idMatcher = innerHtml.match(/\?id=(\d{5,})/);
      if (idMatcher) {
        torrentids.push(idMatcher[1]);
      }
    })
    return torrentids;
  }
}

module.exports = Mteam;