var express = require('express');
var router = express.Router();
var Poll = require('../models/poll')

/* GET home page. */
router.get(/\/(.+)/, function(req, res) {
  var id = req.params[0]
  var poll = Poll.find(id)
  if (poll){
    Poll.checkState(id)
    res.end('poll is ' + poll.state)
  } else {
    Poll.insert({id: req.params[0],
               created_at: new Date(),
               state: 'pending'})
    res.redirect('/' + id)
  }
})

router.get("/", function(req, res) {
  res.render('index', { title: 'Express' });
})

router.post('/entry', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({id: 'foo'}))
})

module.exports = router;
