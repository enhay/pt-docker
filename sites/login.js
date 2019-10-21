const store = require('../store.js');

async function login(page, config) {
  const cookieCollect = store.cookies();
  // 设置cookie
  const domain = config.link.match(/\:\/\/([^\/]+)/)[1]
  const dc = cookieCollect.findOne({ domain })
  if (dc) {
    const cookies = dc.cookie;
    await page.setCookie(...cookies)
  }

  await page.goto(config.link);
  if (page.url() == config.link) {
    return;
  }
  console.log(page.url() == config.link,page.url() ,config.link)
  await page.waitFor(2000);
  await page.type('input[name="username"]', config.username);
  await page.type('input[name="password"]', config.password);
  const promise = page.waitForNavigation({ waitUntil: 'load' });
  await page.click('input[type="submit"]');
  await promise;
  const cookie = await page.cookies();
  if (dc) {
    dc.cookie = cookie;
    cookieCollect.update(dc)
  } else {
    cookieCollect.insert({ domain, cookie })
  }
}

class LoginBase {
  constructor(config, page) {
    this.page = page;
    this.config = config;
  }
  async login() {
    await login(this.page, this.config)
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
  login,
  LoginBase
}