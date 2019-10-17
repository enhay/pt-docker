const config = require('.../config.js')['ttg']


async function run() {
  await page.waitFor('table#torrent_table');
  const doms = await page.$$('#torrent_table tr .name_left');
  const elements = doms.slice(0, config.count || 0)
  elements.forEach(async (item) => {
    const innerHtml = await page.evaluate(e => e.innerHTML, item);
    if (!innerHtml.match(`alt="free"`)) {
      return
    }
    const mr = a.match(/torrent="(\d{5,})/);
    // 为啥没获取上呢？
    if (!mr) {
      return;
    }
    const torrentid = mr[1];
    // 检查是否下载过， 
  })
}