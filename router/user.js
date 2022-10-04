const express = require('express')
// 路由
const router = express.Router()
// controller
const userContorller = require('../controller/userController');
// 用户模块校验
const userValidator = require('../middleware/validator/userValidator');
// jwt校验
const { verifyToken } = require('../utils/jwt');


// 用户列表
router.get('/list', verifyToken, userContorller.list);

// 用户删除
router.post('/delete', userContorller.delete);

// 用户注册
router.post('/register',
    // 规则校验
    userValidator.register,
    userContorller.register
);

// 用户登录
router.post('/login', userValidator.login, userContorller.login);

module.exports = router;