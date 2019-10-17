
async function mteam(page){
  await page.waitFor('table.torrents');
  const doms = await page.$$('.torrentname .embedded:first-child');
  const elements = doms.slice(0, ourbits.count || 0)
  elements.forEach(async (item) => {
    const innerHtml = await page.evaluate(e => e.innerHTML, item);
    if (!innerHtml.match(`alt="Free"`)){
      return
    }
    const mr = a.match(/\?id=(\d{5,})/);
    // 为啥没获取上呢？
    if (!mr){
      return;
    }
    const torrentid = mr[1];
    // 检查是否下载过， 
  })
}