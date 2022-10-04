// 创建mongoose
const mongoose = require('mongoose');
// baseModel
const baseModel = require('./baseModel');
// md5加密
const md5 = require('../utils/md5');

// 用户schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        // 输入是调用md5加密处理
        set: val => md5(val),
        // 查询时不返回该字段
        select: false
    },
    phone: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null
    },
    ...baseModel
});

module.exports = userSchema;