var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');

/* GET home page. */
router.get('/:id', function(req, res) {
  var id = req.params.id
  var poll = Poll.find(id)
  if (poll){
    Poll.checkState(id)
    poll.entries = poll.entries || [];
    res.render(
      'poll/' + poll.state,
      {poll: poll}
    )
  } else {
    Poll.insert({id: id,
               created_at: new Date(),
               state: 'pending',
               question: ''})
    res.redirect('/' + id)
  }
})

router.get("/", function(req, res) {
  res.render('index', { title: 'Express' });
})

router.put('/:id', function(req, res){
  var id = req.params.id;
  var poll = Poll.find(id)
  var entries = poll.entries || [];
  entries.push(req.body.entry);

  Poll.update(id, {entries: entries});
  res.json(200, poll);
})

module.exports = router;
