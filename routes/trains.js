var express = require('express');
var router = express.Router();
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('data/trains.json')
var db = low(adapter)

/* GET trains listing. */
router.get('/', function(req, res, next) {
  res.send(db.get('trains').sortBy('name').value());
  next(); // 这个 next 就表示在 /metrics 里包含 /trains 的 stat
});

module.exports = router;
