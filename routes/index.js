var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/audio', function(req, res) {

});

module.exports = router;
