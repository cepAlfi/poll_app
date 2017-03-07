var models = require('require.all')('../models')

exports.index = function(req, res) {

  models.Poll.find(function(err, polls){
    if (err) {
      throw err;
    }

    res.end(JSON.stringify( {polls: polls} ) );

  })

};

exports.new = function(req, res) {
  res.end("hello from new")
}

exports.create = function(req, res) {
  console.log(req.body);

  var params = {
    name: req.body.name,
    user: req.user._id
  };



  var poll = new models.Poll(params);
  poll.save(function(err, poll){
    if (err){
        res.status(400).json({msg: "Failed to create poll"})
    }

    // next make the options
    var options = req
      .body
      .options
      .split("\n")
      .map(function(opt){
        return {name: opt}
    });

    models.Option.insertMany(options, function(err, options){
      res.json({msg: `Successfully created poll ${params.name}`, success: true })
    })
  })

};

exports.show = function(req, res) {
  console.log(req.params);
  models.Poll.findOne({_id: req.params.pollId}, function(err, poll){
    console.log(poll);
    res.json(poll)
  })
};

exports.edit = function(req, res) {
  res.end("hello from edit")
};

exports.update = function(req, res) {
  res.end("hello from update")
};

exports.destroy = function(req, res) {
  res.end("hello from destory")
};
