const loki = require('lokijs')

const db = new loki('pt.db', {
  autoload:true,
  autoloadCallback,
  autosave:true
});

function autoloadCallback(){
  db.addCollection('cookies');
  db.addCollection('torrents');
  console.log('auto load success')
}

function cookies(){
  return db.getCollection('cookies');
}
function torrents(){
  return db.getCollection('torrents');
}

module.exports = {
  db,
  cookies,
  torrents
}