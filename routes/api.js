const express = require('express');
const router = express.Router();
const authLogin = require('../middleware/authLogin')  // 验证登录状态中间件
const posts = require('../controller/posts')
const users = require('../controller/users')



// 允许跨域访问
router.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
  next()
})

// Define the router, those router is based on '/api'
router.get('/post/list', posts.list);
router.get('/post/detail', posts.detail);
router.post('/post/update', authLogin, posts.update);
router.get('/post/delete', authLogin, posts.delete);

router.get('/user/create', users.createUser);
router.post('/user/login', users.login);
router.post('/user/logout', authLogin, users.logout);
router.get('/user/info', users.getUserInfo);


module.exports = router;
