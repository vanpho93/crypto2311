var CryptoJS = require('crypto-js');
var SECRET_KEY = 'HJGgte5%hds^&ebsdf';

function encrypt(msg){
  return CryptoJS.AES.encrypt(msg, SECRET_KEY).toString();
}

function decrypt(en){
  return CryptoJS.AES.decrypt(en, SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

module.exports = {encrypt, decrypt};
