// validator
const { body, validationResult } = require('express-validator');
const errorValidate = require('./errorBack')
// 使用model模型
const { User } = require('../../modle/index');

// 注册验证
module.exports.register = errorValidate([
    // 用户名 | bail的作用是，当命中用户名不能为空，后面就不会走了。
    body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isLength({min: 3}).withMessage('用户名长度不能小于3').bail()
    .custom(async val => {
        // 查看该用户名是否已被注册
        const usernameValiate = await User.findOne({username: val})
        if(usernameValiate) {
            return Promise.reject('该用户名已被注册')
        }
    }).bail(),

    // 邮箱 | bail的作用是，当命中用户名不能为空，后面就不会走了。
    body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('请输入正确的邮箱').bail()
    .custom(async val => {
        // 查看邮箱是否有被注册
        const emailValiate = await User.findOne({email: val})
        if(emailValiate) {
            return Promise.reject('邮箱已被注册')
        }
    }).bail(),

    // 手机 | bail的作用是，当命中用户名不能为空，后面就不会走了。
    body('phone')
    .notEmpty().withMessage('手机不能为空').bail()
    .matches(/^1[34578]\d{9}$/).withMessage('请输入正确的手机号').bail()
    .custom(async val => {
        // 查看手机号是否有被注册
        const phoneValiate = await User.findOne({phone: val})
        if(phoneValiate) {
            return Promise.reject('手机号已被注册')
        }
    }).bail(),
]);

// 登录验证
module.exports.login = errorValidate([
    // 邮箱 
    body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('请输入正确的邮箱').bail(),
    
    // 密码 
    body('password')
    .notEmpty().withMessage('密码不能为空').bail(),
]);