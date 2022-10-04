const express = require('express')
const app = express()
const cors = require('cors');
// 日志记录
const morgan = require('morgan');
// 路由
const router = require('./router/index');
// 默认配置
const config = require('./config/config.default');

// 请求处理客户端json和urlencoded中间件
app.use(express.json());
app.use(express.urlencoded());

// 跨域
app.use(cors());
// 日志记录
app.use(morgan('dev'));
// 路由
app.use(`/api/${ config.API_VERSION }`, router);
// 数据安全校验



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
