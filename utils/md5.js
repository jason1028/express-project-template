// nodejs加密内置模块
const crypto = require('crypto');

// md5加密
module.exports = passwordStr => {
   return crypto.createHash('md5').update('by' + passwordStr).digest('hex');
}