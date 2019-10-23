const path = require('path');
const userConfig = require('./config.json')


const defaultConfig = {
  'ourbits': {
    link: 'https://ourbits.club/torrents.php',
    downTpl: 'https://ourbits.club/download.php?id=$id&passkey=$passkey&https=1',
    count: 0,
  },
  'ttg': {
    link: 'https://totheglory.im/browse.php?c=M',
    downTpl: 'https://totheglory.im/dl/$id/$passkey',
    count: 0,
  },
  'mteam': {
    link: 'https://pt.m-team.cc/adult.php',
    downTpl: 'https://pt.m-team.cc/download.php?id=$id&passkey=$passkey&https=1',
    count: 0,
  },
  'cmct': {
    link: 'https://springsunday.net/torrents.php',
    downTpl: 'https://springsunday.net/download.php?id=$id&passkey=$passkey',
    count: 0,
  }
}
const config = {};
const siteConf = config.sites = {};
const sites = ['ourbits', 'mteam', 'cmct', 'ttg', 'test']
Object.keys(userConfig).forEach((key) => {
  const uc = userConfig[key];
  if (!sites.includes(key)) {
    config[key] = uc
  } else {
    if (!uc.passkey) {
      return;
    }
    siteConf[key] = { site: key };
    const dc = defaultConfig[key] || {};
    Object.assign(siteConf[key], dc, uc);
  }

})

config.torrentDir = path.join(__dirname, 'torrent');
module.exports = config;