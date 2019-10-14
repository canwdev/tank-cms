var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'TankCMS' });
});

// new
router.get('/post/new', function(req, res) {
  res.render('posts_new');
});


module.exports = router;
