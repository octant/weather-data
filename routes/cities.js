var express = require('express');
var router = express.Router();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json')

var db = low(adapter);

/* GET cities listing. */
router.get('/', function(req, res, next) {
  var name = new RegExp(req.query.name, 'i');
  var city = db.get('cities')
    .filter((item) => {
      return item.name.match(name);
    })
    .sortBy('country')
    .take(20)
    .value();

  res.send(city);
});

module.exports = router;
