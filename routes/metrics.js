var express = require('express');
var router = express.Router();
var promClient = require('prom-client');


promClient.collectDefaultMetrics();

/* Get train listing */

router.get('/', (req, res, next) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(promClient.register.metrics());

})

module.exports = router;
