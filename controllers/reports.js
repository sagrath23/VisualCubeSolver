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
                                            (SELECT COUNT(sf."SalesOrderId") FROM sales_orders_facts sf) AS "ventas personas" , 
                                            (SELECT COUNT(stsf."SalesOrderId") FROM sales_orders_to_store_facts stsf ) AS "ventas tiendas"`, { type: db.QueryTypes.SELECT }));

  Promise.all(salesReportDependencies).then(function(result){
    //retrieve data to front
    console.log(result);
    //extract data from resultant array
    result = result[0][0];

    var data = {
      labels: [],
      data: []
    };

    for(var key in result){
      data.labels.push(key);
      data.data.push(result[key]);
    }
    
    //send response to view while we do all the stuff in background
    res.send(data);
  });      
};

exports.getSalesCountPerMonth = function(req, res, next) {

  var me = this,
      salesReportDependencies = [];

  db.query(`SELECT 
              COUNT(sof."SalesOrderId") AS client_sales, 
              sof."dateDimensionId" AS date_dimension,
              dd."dateName" AS date_name
            FROM 
              sales_orders_facts sof
              INNER JOIN dates_dimensions dd ON dd."dateDimensionId" = sof."dateDimensionId"
            GROUP BY dd."dateName", sof."dateDimensionId"
            ORDER BY sof."dateDimensionId" ASC`, { type: db.QueryTypes.SELECT }).then(
            function(result){
              console.log(result);
              res.send(result);
            });    
  /*
  Models.SalesOrdersFact.findAll({
      attributes: ['dateDimensionId',db.fn('count', db.col('SalesOrderId'))], 
      group: ['dateDimensionId']}).then(function(result){
        console.log("-----------------------------------------gotcha count!!!");
        console.log(result);
        res.send(result);
      });
      
  
  */
  //db.query(`SELECT DISTINCT sof."dateDimensionId" AS date_dimension FROM sales_orders_facts sof`, { type: db.QueryTypes.SELECT })
  /*.then(function(result){
    console.log(result);
    res.send(result);
  });*/
  
};
