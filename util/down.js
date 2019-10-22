const store = require('../store.js');
const path = require('path');
const debug = require('debug')('pt:down')
const { DownloaderHelper } = require('node-downloader-helper');

async function download(link) {
  const dl = new DownloaderHelper(link, __dirname);
  dl.start().catch((err) => {
    debug(err)
  });
}

async function downOnce(links) {
  const collection = store.torrents(); //
  links.forEach((link) => {
    const entity = { link };
    const existingRecord = collection.findOne(entity)
    if (!existingRecord) {
      debug('will down torrent', link);
      collection.insertOne(entity);
      download(link)
    }
  })
}

module.exports = {
  downOnce
}