const rp = require('request-promise');
const imageToBase64 = require('image-to-base64');

const jsdatiConfig = {
  softwareId: 16698,
  softwareSecret: 'tGsjR919wGvsRzEdv7zqAUPrCyc8P3n32LABdzRY',
  username: 'ptcoder',
  password: 'C7Y2pKKk.aaTgZK',
  captchaType: 1014,
  captchaData: '',
}

async function parse(imgurl) {
  const imagebase = await imageToBase64(imgurl)
  const resp = await rp.post('https://v2-api.jsdama.com/upload', { body: genParseForm(imagebase), json: true, timeout: 30000 })
  if(!resp.code){
    return resp.data.recognition;
  }
  throw new Error(resp.message);
}

function genParseForm(captchaData) {
  return Object.assign({}, jsdatiConfig, { captchaData });
}

module.exports = {
  parse
}