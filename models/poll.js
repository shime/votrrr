var db = require('lowdb');
db.load();

var collection = db('polls');

module.exports = {
  find: function(id){
    return collection.where({id: id}).value()[0]
  },
  update: function(id, attrs){
    return collection.updateWhere({id: id}, attrs)
  },
  insert: function(attrs){
    return collection.insert(attrs);
  },
  checkState: function(id){
    var poll = this.find(id)
    var hoursPassed = (new Date() - new Date(poll.created_at))/(1000 * 60 * 60);

    if (hoursPassed > 12){
      this.update(id, {state: 'closed'})
    } else if (hoursPassed > 2){
      this.update(id, {state: 'active'})
    }
  }
}
