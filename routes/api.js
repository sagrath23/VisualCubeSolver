var models = require('../controllers/models');
var reports = require('../controllers/reports');
// var videos = require('../controllers/videos');
// var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app) {
  //user routes
  
  app.get('/models/sync', models.sync);
  app.get('/sales/getsales', reports.getSalesPerClientType);
  app.get('/sales/getsalespermonth', reports.getSalesCountPerMonth);
  
}


module.exports = routesAPI;
