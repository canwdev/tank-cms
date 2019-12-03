const express = require('express');
const router = express.Router();
const authLogin = require('../components/user/authLoginMiddleware')  // 验证登录状态中间件
const website = require('../components/tool/website')
const menus = require('../components/menu')
const banner = require('../components/banner')
const posts = require('../components/post')
const users = require('../components/user')
const tools = require('../components/tool')
const oss = require('../components/tool/oss')
const COMMON = require('../utils/common')


// 允许跨域访问
router.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
  next()
})

// Define the router, those router is based on '/api'
router.get('/', website.index);

router.get('/banner/list', banner.list)
router.post('/banner/update', authLogin, banner.update)
router.get('/banner/delete', authLogin, banner.delete)

router.get('/menu/list', menus.list)
router.post('/menu/update', authLogin, menus.update)
router.get('/menu/delete', authLogin, menus.delete)

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
router.get('/tools/oss-policy', oss.getOssPolicy)
router.get('/tools/listUploaded', authLogin, tools.listUploadedFile);
router.post('/tools/deleteUploaded', authLogin, tools.deleteUploadedFile);
router.get('/tools/encryptText', authLogin, tools.encryptText);

router.get('/tools/getSettings', authLogin, tools.getSettings);
router.post('/tools/setSettings', authLogin, tools.setSettings);
router.post('/tools/saveHitokoto', tools.saveHitokoto);
router.get('/tools/queryHitokoto', tools.queryHitokoto);
router.get('/tools/temp', tools.temp);

module.exports = router;
