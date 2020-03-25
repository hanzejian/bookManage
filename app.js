const express = require('express');
// const bodyParser = require('body-parser');
const template = require('art-template');
const app = express();
const path = require('path');
const router = require('./router.js');


// 启动静态资源服务
app.use('/www', express.static('public'));


// 设置模板引擎
// 设置模板的路径
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎
app.set('view engine', 'art');
// 使 express 兼容 art-template 模板引擎
app.engine('art', require('express-art-template'));

// 处理请求参数
// 挂载参数处理中间件
app.use(express.urlencoded({extended: false}));
// 处理 json 格式的参数
app.use(express.json());

// 系统服务器功能
// 配置路由
app.use(router);
// 监听端口
app.listen(3000, ()=>{
  console.log('running...');
})