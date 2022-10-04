const { User } = require('../modle/index');
const { createToken } = require('../utils/jwt');

// 用户列表
exports.list = async (req, res) => {
    console.log(req.method);
    res.send('/user-list....');
};

// 用户删除
exports.delete = async (req, res) => {
    console.log(req.method);
    res.send('/user-delete...');
};  

// 用户注册
exports.register = async (req, res) => {
    const userModel = new User(req.body);

    const dbBack = await userModel.save();
    const user = dbBack.toJSON();
    // 移除password，不返回。
    delete user.password;
    res.status(201).json({
        user
    });
}

// 用户登录
exports.login = async (req, res) => {
    let dbBack = await User.findOne(req.body);
    if(!dbBack) {
        // 402代表无匹配数据
        res.status(402).json({ error: "邮箱或者密码不正确" });
    }
    // 转化为json对象
    dbBack = dbBack.toJSON();
    // 生成token
    dbBack.token = await createToken(dbBack);
    res.status(200).json(dbBack);
}

// 用户登录检查
