//datawharehouse connection
var db = require('../config/database');
//Promise Manager
var Promise = require('bluebird');

//datawharehouse dimensions & facts
var Models = require('../models/bootstrap');

exports.getSalesPerClientType = function(req, res, next) {
  console.log("getting data...");
  var me = this,
      salesReportDependencies = [];

  salesReportDependencies.push(db.query('SELECT COUNT(sof."SalesOrderId") AS client_sales, COUNT(sots."SalesOrderId") AS store_sales FROM sales_orders_facts sof, sales_orders_to_store_facts sots', { type: db.QueryTypes.SELECT }));

  Promise.all(salesReportDependencies).then(function(result){
    console.log(result);
    //retrieve data to front
    var data = {
      labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
      data: [250, 600, 3
      00]
    };
    //send response to view while we do all the stuff in background
    res.send(data);
  });      
};