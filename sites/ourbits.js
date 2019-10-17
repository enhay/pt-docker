
// const { login } = require('./login');

const debug = require('debug')

// 设置一个interface,约束必须有login和run方法
// 设置一个base 实现基础的login方法

class Ourbits {
  constructor(config, page) {
    this.config = config;
    this.page = page;
  }
  async run() {
    await this.login()
    const ids = await this.getFreeTorrent();
    const links = this.genDownLink(ids);

  }
  async getFreeTorrent() {
    await this.page.waitFor('table.torrents');
    const doms = await this.page.$$('.torrentname .embedded:first-child');
    const evalArr = doms.slice(0, config.count || 0).map((item) => {
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
        torrentids.push(mr[1]);
      }
    })
    return torrentids;
  }
  // todo: 提升到base里
  async genDownLink(ids) {
    return ids.map((id) => {
      return this.downTmp.replace('$id', id);
    });
  }
}


async function getTorrent(page) {
  await page.waitFor('table.torrents');
  const doms = await page.$$('.torrentname .embedded:first-child');
  const elements = doms.slice(0, config.count || 0)
  elements.forEach(async (item) => {
    const innerHtml = await page.evaluate(e => e.innerHTML, item)
    page.evaluate(e => e.innerHTML, item).then()
    if (!innerHtml.match(`class="pro_free"`)) {
      return
    }
    const mr = a.match(/\?id=(\d{5,})/);
    // 为啥没获取上呢？
    if (!mr) {
      return;
    }
    const torrentid = mr[1];
    // 检查是否下载过， 
  })
}

// 继承的方式
async function getFreeTorrent() {

}

async function checkTorrentFree(torrentDom) {

}


async function getTorrentLink() {

}

async function run(browser, config) {
  const page = await browser.newPage();
  try {
    await login(page, config.link)
    await downTorrent(page)
  } catch (error) {

  }

}



