'use strict';

module.exports = function(app) {
  var get = require('../controllers/get-controller');
  app.route('/buses')
    .get(get.buses)
    .post(get.deny);

  app.route('/trains')
    .get(get.trains)
    .post(get.deny);

  app.route('/ferries')
    .get(get.ferries)
    .post(get.deny);

  var post = require('../controllers/post-controller');
  app.route('/post')
    .get(post.deny)
    .post(post.post);
}
