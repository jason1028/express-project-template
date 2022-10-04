const { validationResult } = require('express-validator');

// 统一错误处理
module.exports = validations => {
    return async (req, res, next) => {
        // 执行所有验证
        await Promise.all(validations.map(validate => validate.run(req)));
        // 收集错误信息
        const errors = validationResult(req);
        // 用户反馈
        if(!errors.isEmpty()) {
            return res.status(401).json({ 
                errors: errors.array()
            });
        }
        // 无错误则执行下一步
        next();
    }
}