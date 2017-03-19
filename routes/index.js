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

router.post('/audio', function(req, res) {

});

router.post('/profiles', function(req, res){

	db.find({}, function(err, docs){
		console.log(docs)
		res.send(docs)
	})
})

module.exports = router;
