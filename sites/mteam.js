
const debug = require('debug')("pt:mteam");
const { SiteBase } = require('./login');


class Mteam extends SiteBase {
  constructor(config, page) {
    super(config, page)
  }
  async getFreeTorrent() {
    await this.page.waitFor('table.torrents');
    const doms = await this.page.$$('.torrentname .embedded:nth-child(2)');
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