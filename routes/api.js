var express = require('express');
var router = express.Router();

var db = require('../db/async-db')

// 允许跨域访问
router.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
  next()
})

// Define the router, those router is based on '/api'
router.get('/posts', async function(req, res, next) {
  try {

    let result = await db.query('SELECT * FROM posts')
    res.json(result)
  } catch (e) {
    res.status(500).send(e)
  }
});

router.post('/new_post', async function(req, res, next) {
  try {

    const data = req.body

    let result = await db.query('INSERT INTO posts(title, content) VALUES(?,?)', [data.title, data.content])
    res.json(result)

  } catch (e) {
    res.status(500).send(e)
  }
});


module.exports = router;
