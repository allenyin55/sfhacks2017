var express = require('express');
var router = express.Router();
var Datastore = require('nedb')
  , db = new Datastore({filename: './data.db', autoload: true });

router.get('/', function(req, res) {
  res.render('index');
});

var audio_score = 50;

router.get('/score', function(req, res) {
  res.json({
    success: true,
    data: audio_score
  });
}

router.post('/audio', function(req, res) {
  audio_score = (audio_score + req.data) / 2;
  res.json({
    success: true
  });
});

router.post('/profiles', function(req, res){
	db.insert(req.body, function (err, newDoc) {   
		console.log(err)
});

	db.find({}, function(err, docs){
		console.log(docs)
		res.send(docs)
	})

/*	db.find({ $not: { name: req.body.name }}, function (err, docs){
		res.send(docs)
	})*/
})

module.exports = router;
