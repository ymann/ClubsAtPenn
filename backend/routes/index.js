var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yonah@Penn', condition: true, anyArray: [1,2,3] });
});


router.get('/get-data', function(req, res, next) {
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('club-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('index', {clubs: resultArray});
        });
    });
});

router.post('/insert', function(req, res, next) {
    var club = {
        name: req.body.name,
        description: req.body.description,
        numMembers: req.body.numMembers
    };

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('club-data').insertOne(club, function(err, res) {
            assert.equal(null, err);
            console.log('Item Inserted');
            db.close();
        });
    });

    res.redirect('/');
});

//====================================================
router.get('/:clubName', function(req, res, next) {
    res.render('club', {title: req.params.clubName});
});

module.exports = router;
