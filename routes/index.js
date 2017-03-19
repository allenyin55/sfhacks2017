var express = require('express');
var router = express.Router();
var Datastore = require('nedb')
  , db = new Datastore();

  var doc = [{
	"name":"Haonan Yin",
	"age":18,
	"location": "Martinez"
},{
	"name": "Johann Banta",
	"age":20,
	"location": "Berkeley"
}
];

	db.insert(doc, function (err, newDoc) {   
		console.log(err)
});

router.get('/', function(req, res) {
  res.render('index');
});

var audio_score = 50;

router.get('/score', function(req, res) {
  console.log(audio_score);
  res.json({
    success: true,
    data: audio_score
  });
})

router.post('/audio', function(req, res) {
  console.log(req.body.score);
  audio_score = (audio_score + req.body.score) / 2;
  res.json({
    success: true
  });
});

router.get('/getImage', function(req, res, next){
	var spawn = require('child_process').spawn,
		  py    = spawn('python27', ['emotions.py']),
		  data = [1,2,3,4,5,6,7,8,9],
		  dataString = '';

	py.stdout.on('data', function(data){
		//dataString += data.toString();
		console.log("from python", data.toString());
		res.end(data.toString());
	});

	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
})

router.post('/profiles', function(req, res){

	db.find({}, function(err, docs){
		console.log(docs)
		res.send(docs)
	})
})

module.exports = router;
