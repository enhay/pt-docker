const { DownloaderHelper } = require('node-downloader-helper');
const dl = new DownloaderHelper('https://totheglory.im/dl/390105/5f0e65b19f75013c98cd2b2ac6c77490', __dirname);

// https://pt.m-team.cc/download.php?id=326055&passkey=454455afa4fe5201af63802bc53fb72e&https=1
dl.on('end', () => console.log('Download Completed'))
// dl.start();

const config = require('../config.json')

async function download(link) {
  const dl = new DownloaderHelper('https://ourbits.club/download.php?id=111793&passkey=c0a09d40555067f1c70ac07734903e9d&https=1', __dirname);
  dl.on('end', () => console.log('Download Completed'))
  dl.start();
}


