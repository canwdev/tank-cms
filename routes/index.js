const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>{
  return res.send('TankCMS 正在运行')
});

module.exports = router;
