const express = require('express');
const router = express.Router();
const website = require('../components/tool/website')

/* GET home page. */
router.get('/', website.index);

// new
router.get('/post/new', function(req, res) {
  res.render('posts_new');
});


module.exports = router;
