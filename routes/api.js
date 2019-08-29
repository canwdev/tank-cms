const express = require('express');
const router = express.Router();
const authLogin = require('../middleware/authLogin')  // 验证登录状态中间件
const posts = require('../controller/posts')
const users = require('../controller/users')
const tools = require('../controller/tools')
const COMMON = require('../utils/common')


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

const multer = require('multer') // 图片上传模块
var upload = multer({
  dest: COMMON.UPLOAD_PATH + '/'
})// 定义图片上传的临时目录
router.post('/tools/upload', authLogin, upload.single('fileToUpload'), tools.uploadFile);
router.get('/tools/listUploaded', authLogin, tools.listUploadedFile);
router.post('/tools/deleteUploaded', authLogin, tools.deleteUploadedFile);
router.get('/tools/encryptText', authLogin, tools.encryptText);

router.get('/tools/getSettings', authLogin, tools.getSettings);


module.exports = router;
