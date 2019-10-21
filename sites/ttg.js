
const debug = require('debug')("pt:ttg");
const { downOnce } = require('../util/down');
const { LoginBase } = require('./login');


class TTG extends LoginBase {
  constructor(config, page) {
    super(config, page)
  }
  async run() {
    try {
      await this.login()
      await this.page.screenshot({
        path: 'ttg.png',
        fullPage: false,
      });
    } catch (error) {
      console.log(error)
      return;
    }
    const ids = await this.getFreeTorrent();
    const links = this.genDownLink(...ids);
    downOnce(links);
  }
  async getFreeTorrent() {
    await this.page.waitFor('table#torrent_table');
    const doms = await this.page.$$('#torrent_table tr .name_left');
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
      if (!innerHtml.match('alt="free"')) {
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

module.exports = TTG;