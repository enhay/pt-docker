const config = require('config.json')


const siteDefaultConfig = {
  'ourbits': {
    link: 'http://ourbits.club/torrents.php',
    downTemp: 'https://ourbits.club/download.php?id=$id&passkey=$passkey&https=1'
  },
  'ttg': {
    link: 'https://totheglory.im/browse.php?c=M',
    downTemp: 'https://totheglory.im/dl/$id/$passkey',
  },
  'mteam': {
    link: 'https://pt.m-team.cc/adult.php',
    mteam: 'https://pt.m-team.cc/download.php?id=$id&passkey=$passkey&https=1'
  }
}

Object.keys(config).forEach((site) => {
  const siteConfig = config[site];
  Object.assign(siteDefaultConfig[site] || {site}, siteConfig);
  siteConfig.downTemp = siteConfig.downTemp.replace('$passkey', siteConfig.passkey);
})

module.exports = config;