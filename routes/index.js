var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// new
router.get('/post/new', function(req, res, next) {
  res.render('posts_new');
});


module.exports = router;
