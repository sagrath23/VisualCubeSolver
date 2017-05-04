//datawharehouse connection
var db = require('../config/database');
//Promise Manager
var Promise = require('bluebird');

//datawharehouse dimensions & facts
var Models = require('../models/bootstrap');

exports.getSalesPerClientType = function(req, res, next) {
  console.log("!!!getting data...");
  var me = this,
      salesReportDependencies = [];

  salesReportDependencies.push(db.query(`SELECT 
                                            COUNT(sof."SalesOrderId") AS client_sales, 
                                            COUNT(sots."SalesOrderId") AS store_sales 
                                         FROM 
                                            sales_orders_facts sof, 
                                            sales_orders_to_store_facts sots`, { type: db.QueryTypes.SELECT }));

  Promise.all(salesReportDependencies).then(function(result){
    console.log("............................................");
    console.log(result);
    //retrieve data to front
    console.log(result);
    var data = {
      labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
      data: [250, 600, 300]
    };
    //send response to view while we do all the stuff in background
    res.send(data);
  });      
};

exports.getSalesCountPerMonth = function(req, res, next) {
  console.log("!!!getting data...");

  var me = this,
      salesReportDependencies = [];
  Models.SalesOrdersFact.findAll({
      attributes: ['dateDimensionId',db.fn('count', db.col('SalesOrderId'))], 
      group: ['dateDimensionId']}).then(function(result){
        console.log("-----------------------------------------gotcha count!!!");
        console.log(result);
        res.send(result);
      });
  /*
  db.query(`SELECT 
              COUNT(sof."SalesOrderId") AS client_sales, 
              sof."dateDimensionId" AS date_dimension
            FROM 
              sales_orders_facts sof
            GROUP BY sof."dateDimensionId"`, { type: db.QueryTypes.SELECT })
  .then(function(result){
    console.log("-----------------------------------------gotcha count!!!");
    console.log(result);
    res.send(result);
  });
  */
};
