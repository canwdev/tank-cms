const router = require('express').Router();
const authLogin = require('../../components/user/authLoginMiddleware')  // 验证登录状态中间件
const website = require('../../components/tool/website')
const menus = require('../../components/menu')
const banner = require('../../components/banner')
const posts = require('../../components/post')
const users = require('../../components/user')
const recruit = require('../../components/recruit')


router.use('/tools', require('./tools'));

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

router.get('/recruit/list', recruit.list)
router.get('/recruit/types', recruit.types)
router.post('/recruit/update', authLogin, recruit.update)
router.get('/recruit/delete', authLogin, recruit.delete)
router.get('/recruit/find', recruit.find)


router.use((err, req, res, next) => {
  // if (err.name === 'ValidationError') {
  // }

  return next(err)
})

module.exports = router;
