const express = require('express')
const router = express.Router()
// controller
const videoController = require('../controller/videoController');

// 用户列表
router.get('/list', videoController.list);

module.exports = router;