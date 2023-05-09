var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next(); // 这个 next 就表示在 /metrics 里包含 / 的 stat
});

module.exports = router;
