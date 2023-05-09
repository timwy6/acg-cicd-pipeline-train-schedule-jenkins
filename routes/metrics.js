var express = require('express');
var router = express.Router();
var promClient = require('prom-client');

promClient.collectDefaultMetrics();

/* GET trains listing. */
router.get('/', function(req, res, next) {
  	res.set('Content-Type', promClient.register.contentType);
    res.end(promClient.register.metrics());
    // next(); // 这个 next 就表示在 /metrics 里包含 /metrics 的 stat
});

module.exports = router;
