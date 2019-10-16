const loki = require('lokijs')

const db = new loki('pt.db')

const cookies = db.addCollection('cookies')
const torrents = db.addCollection('torrents');


module.exports = {
  db,
  cookies,
  torrents
}