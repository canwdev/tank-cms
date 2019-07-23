const express = require('express');
const router = express.Router();

const posts = require('../controller/posts')
const users = require('../controller/users')


// 允许跨域访问
router.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
  next()
})

// Define the router, those router is based on '/api'
router.get('/post/list', posts.listPosts);
router.post('/post/create', posts.createPost);

router.get('/user/create', users.createUser)


module.exports = router;
