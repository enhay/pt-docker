const config = require('config.json')

const downTmps = {
  'ourbits': 'https://ourbits.club/download.php?id=$id&passkey=$passkey&https=1',
  'ttg': 'https://totheglory.im/dl/$id/$passkey',
  'mteam': 'https://pt.m-team.cc/download.php?id=$id&passkey=$passkey&https=1',
}

Object.keys(config).forEach((item) => {
  const dt = downTmps[item];
  if (!dt) {
    return;
  }
  const siteConfig = config[item];
  siteConfig.downTmps = dt.replace('$passkey', siteConfig.passkey);
})

module.exports = config;