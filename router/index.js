const express = require('express')
const router = express.Router()

// 视频模块
router.use('/video', require('./video'));
// 用户模块
router.use('/user', require('./user'));

module.exports = router;