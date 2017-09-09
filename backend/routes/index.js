var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yonah@Penn', condition: true, anyArray: [1,2,3] });
});

router.get('/:clubName', function(req, res, next) {
    res.render('club', {title: req.params.clubName});
});

module.exports = router;
