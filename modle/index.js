// 引入mongoose库
const mongoose = require('mongoose');
const config = require('../config/config.default');

async function main() {
    // 连接数据库
    await mongoose.connect(config.MONGODB_PATH);
}

main()
.then(res => {
    // console.log('mongo连接成功.');
})
.catch(err => {
    console.log(err);
    console.log('mongo连接失败...');
});

module.exports = {
    User: mongoose.model('User', require('./userModel'))
}