const store = require('../store.js');
const debug = require('debug')('pt:sitebase');
const config = require('../config.js');
const { downOnce } = require('../util/down')
class SiteBase {
  constructor(config, page) {
    this.page = page;
    this.config = config;
  }
  async run() {
    try {
      await this.login()
    } catch (error) {
      await this.page.screenshot({
        path: `${config.torrentDir}/${this.config.site}.png`,
        fullPage: true
      })
      debug(error)
      return;
    }
    const ids = await this.getFreeTorrent();
    const links = this.genDownLink(...ids);
    downOnce(links);
    await this.page.close();
  }
  async login() {
    const cookieCollect = store.cookies();
    // 设置cookie
    const domain = this.config.link.match(/\:\/\/([^\/]+)/)[1]
    const dc = cookieCollect.findOne({ domain })
    if (dc) {
      const cookies = dc.cookie;
      await this.page.setCookie(...cookies)
    }
    debug(`run page ${this.config.link}`);
    await this.page.goto(this.config.link);
    if (this.page.url() == this.config.link) {
      return;
    }
    await this.page.waitFor(2000);
    await this.page.type('input[name="username"]', this.config.username);
    await this.page.type('input[name="password"]', this.config.password);
    const promise = this.page.waitForNavigation({ waitUntil: 'load' });
    await this.beforeSubmitHook();
    await this.page.click('[type="submit"]');
    await promise;
    const cookie = await this.page.cookies();
    if (dc) {
      dc.cookie = cookie;
      cookieCollect.update(dc)
    } else {
      cookieCollect.insert({ domain, cookie })
    }
  }
  async beforeSubmitHook() {

  }
  async getFreeTorrent() {
    return [];
  }
  closePage() {
    this.page.close();
  }
  genDownLink(...ids) {
    if (!this.config.downTpl) {
      return [];
    }
    return ids.map((id) => {
      return this.config.downTpl.replace('$id', id).replace('$passkey', this.config.passkey);
    });
  }
}

module.exports = {
  SiteBase
}