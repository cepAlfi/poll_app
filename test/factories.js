var factory = require('factory-girl').factory;
var models = require('require.all')('../models')

factory.define('user', models.User, {
  email: factory.sequence(function(n) {
    return 'user' + n + '@demo.com';
  }),
  password: '123',

});

factory.define('poll', models.Poll, {
  name: "some poll",
  user: factory.assoc('user', '_id')
})
module.exports = factory
