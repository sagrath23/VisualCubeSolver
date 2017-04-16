var models = require('../controllers/models');
// var videos = require('../controllers/videos');
// var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app) {
  //user routes
  //app.post('/user/auth', users.auth);
  app.get('/models/sync', models.sync);
  //
  // //video routes
  // app.get('/videos', helpers.isAuthenticated, videos.get);
  // app.get('/video', helpers.isAuthenticated, videos.getOne);
  // app.post('/video/ratings', helpers.isAuthenticated, videos.rate);
}


module.exports = routesAPI;
