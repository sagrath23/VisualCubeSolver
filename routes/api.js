var models = require('../controllers/models');
var reports = require('../controllers/reports');
// var videos = require('../controllers/videos');
// var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app) {
  //user routes
  
  app.get('/models/sync', models.sync);
  app.post('/models/execute_query', models.executeQuery);
  app.get('/sales/getsales', reports.getSalesPerClientType);
  app.get('/sales/getsalespermonth', reports.getSalesCountPerMonth);
  app.get('/products/getsalespermonth', reports.getProductsSales);
  
}


module.exports = routesAPI;
