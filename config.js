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
    link: 'https://pt.m-team.cc/torrents.php',
    downTpl: 'https://pt.m-team.cc/download.php?id=$id&passkey=$passkey&https=1',
    count: 0,
  },
  'cmct':{
    link:'https://springsunday.net/torrents.php',
    downTpl: 'https://springsunday.net/download.php?id=$id&passkey=$passkey',
    count: 0,
  }
}
const config = {};
Object.keys(userConfig).forEach((site) => {
   config[site] = {}; 
  const uc = userConfig[site];
  const dc = defaultConfig[site] || {};
  Object.assign(config[site], dc, uc);
})

module.exports = config;