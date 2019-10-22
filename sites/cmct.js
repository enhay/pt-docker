
const debug = require('debug')("pt:ourbits");
const { SiteBase } = require('./login');
const qParser = require('../util/parse');

class CMCT extends SiteBase {
  constructor(config, page) {
    super(config, page)
  }

  async beforeSubmitHook(page) {
    const captchaImg = await this.page.$eval('.verify-image img', img => img.src);
    const str = await qParser.parse(captchaImg);
    await this.page.type('input[name="imagestring"]', str)
  }

  async getFreeTorrent() {
    await this.page.waitFor('table.torrents');
    const doms = await this.page.$$('.torrentname .embedded:nth-child(1)');
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


module.exports = CMCT;