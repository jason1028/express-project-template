const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config/config.default');

// 将正常的方法转化为promise调用
const toJWT = promisify(jwt.sign);
const verify = promisify(jwt.verify);

// 生成一个token
module.exports.createToken = async (userInfo) => {
    // 返回token
    return await toJWT(
        userInfo, 
        config.JWT_SCRIT_KEY,
        {
            // 过期时间(1小时, 3600s)
            expiresIn: 60 * 60
        }
    );
}

// 校验一个token
module.exports.verifyToken = async (req, res, next) => {
    // 获取token
    let token = req.headers.authorization;
    token = token ? token.split("Bearer ")[1] : null;
    if(!token) {
        res.status(402).json({ error: '缺少token' });
    }
    try {
        let userInfo = await verify(token, config.JWT_SCRIT_KEY);
        // 带上用户信息，方便后续去使用
        req.user = userInfo;
        next();
    }catch (error) {
        res.status('402').json({ error: '无效的token' });
    }
    // return await verify(token, config.JWT_SCRIT_KEY);
}