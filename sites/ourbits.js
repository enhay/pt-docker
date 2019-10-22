
const debug = require('debug')("pt:ourbits");
const { SiteBase } = require('./login');

class Ourbits extends SiteBase {
  constructor(config, page) {
    super(config, page)
  }
  async getFreeTorrent() {
    await this.page.waitFor('table.torrents');
    const doms = await this.page.$$('.torrentname .embedded:first-child');
    const evalArr = doms.slice(0, this.config.count).map((item) => {
      return this.page.evaluate(e => e.innerHTML, item).catch((err) => {
        return '';
      })
    });
    const domHtmls = await Promise.all(evalArr).catch((err) => {
      return [];
    });
    const torrentids = [];
    domHtmls.forEach((innerHtml) => {
      if (!innerHtml.match(`class="pro_free"`)) {
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

module.exports = Ourbits;