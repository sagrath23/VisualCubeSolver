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
                                            (SELECT COUNT(sf."SalesOrderId") FROM sales_orders_facts sf) AS "ventas por internet" , 
                                            (SELECT COUNT(stsf."SalesOrderId") FROM sales_orders_to_store_facts stsf ) AS "ventas a tiendas"`, { type: db.QueryTypes.SELECT }));

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

  //puedo cargar las ventas a clientes y a tiendas :D    
  //ventas a clientes
  salesReportDependencies.push(db.query(`SELECT 
              COUNT(sof."SalesOrderId") AS client_sales, 
              sof."dateDimensionId" AS date_dimension,
              dd."dateName" AS date_name
            FROM 
              sales_orders_facts sof
              INNER JOIN dates_dimensions dd ON dd."dateDimensionId" = sof."dateDimensionId"
            GROUP BY dd."dateName", sof."dateDimensionId"
            ORDER BY sof."dateDimensionId" ASC`, { type: db.QueryTypes.SELECT }));

  //ventas a tiendas
  salesReportDependencies.push(db.query(`SELECT 
              COUNT(sof."SalesOrderId") AS store_sales, 
              sof."dateDimensionId" AS date_dimension,
              dd."dateName" AS date_name
            FROM 
              sales_orders_to_store_facts sof
              INNER JOIN dates_dimensions dd ON dd."dateDimensionId" = sof."dateDimensionId"
            GROUP BY dd."dateName", sof."dateDimensionId"
            ORDER BY sof."dateDimensionId" ASC`, { type: db.QueryTypes.SELECT }));

  Promise.all(salesReportDependencies).then(function(results){
    console.log('Prepare datasets');
    var data = {},
        usedLabels = {},
        labels = [],
        clientsData = {data:[], label: 'Ventas por internet'},
        storesData = {data:[], label: 'Ventas a tiendas'};

    //sacamos los labels de todas las ventas (asumiendo que se vendió en ambos en todos los meses)
    //internet
    for(var i = 0; i < results[0].length; i++){
      usedLabels[results[0][i].date_name] = {internet:true};
    }
    //tiendas
    for(var i = 0; i < results[1].length; i++){
      usedLabels[results[1][i].date_name]['store'] = true;
    }

    //y los paso al arreglo de labels
    for(var i in usedLabels){
      labels.push(i);
    }

    var clientDelta = 0,storeDelta = 0;

    for(var i = 0; i < labels.length; i++){
      if(usedLabels[labels[i]].internet){
        //esta
        clientsData.data.push(results[0][i-clientDelta].client_sales); 
      }
      else{
        //no está
        clientDelta++;
        clientsData.data.push(0);
      }

      if(usedLabels[labels[i]].store){
        storesData.data.push(results[1][i-storeDelta].store_sales);
      }
      else{
        storeDelta ++;
        storesData.data.push(0);
      }
    }

    //ponemos todo junto
    data.labels = labels;
    data.datasets = [clientsData,storesData];
        
    //console.log(data.datasets[1]);
    //y enviamos
    res.send(data);
  });  
};

exports.getProductsSales = function(req, res, next) {

  var me = this,
      salesReportDependencies = [];

  //puedo cargar las ventas a clientes y a tiendas :D    
  //ventas a clientes
  salesReportDependencies.push(db.query(`SELECT 
              COUNT(sof."SalesOrderId") AS client_sales, 
              sof."dateDimensionId" AS date_dimension,
              dd."dateName" AS date_name
            FROM 
              sales_orders_facts sof
              INNER JOIN dates_dimensions dd ON dd."dateDimensionId" = sof."dateDimensionId"
            GROUP BY dd."dateName", sof."dateDimensionId"
            ORDER BY sof."dateDimensionId" ASC`, { type: db.QueryTypes.SELECT }));

  //ventas a tiendas
  salesReportDependencies.push(db.query(`SELECT 
              COUNT(sof."SalesOrderId") AS store_sales, 
              sof."dateDimensionId" AS date_dimension,
              dd."dateName" AS date_name
            FROM 
              sales_orders_to_store_facts sof
              INNER JOIN dates_dimensions dd ON dd."dateDimensionId" = sof."dateDimensionId"
            GROUP BY dd."dateName", sof."dateDimensionId"
            ORDER BY sof."dateDimensionId" ASC`, { type: db.QueryTypes.SELECT }));

  Promise.all(salesReportDependencies).then(function(results){
    console.log('Prepare datasets');
    var data = {},
        usedLabels = {},
        labels = [],
        clientsData = {data:[], label: 'Ventas por internet'},
        storesData = {data:[], label: 'Ventas a tiendas'};

    //sacamos los labels de todas las ventas (asumiendo que se vendió en ambos en todos los meses)
    //internet
    for(var i = 0; i < results[0].length; i++){
      usedLabels[results[0][i].date_name] = {internet:true};
    }
    //tiendas
    for(var i = 0; i < results[1].length; i++){
      usedLabels[results[1][i].date_name]['store'] = true;
    }

    //y los paso al arreglo de labels
    for(var i in usedLabels){
      labels.push(i);
    }

    var clientDelta = 0,storeDelta = 0;

    for(var i = 0; i < labels.length; i++){
      if(usedLabels[labels[i]].internet){
        //esta
        clientsData.data.push(results[0][i-clientDelta].client_sales); 
      }
      else{
        //no está
        clientDelta++;
        clientsData.data.push(0);
      }

      if(usedLabels[labels[i]].store){
        storesData.data.push(results[1][i-storeDelta].store_sales);
      }
      else{
        storeDelta ++;
        storesData.data.push(0);
      }
    }

    //ponemos todo junto
    data.labels = labels;
    data.datasets = [clientsData,storesData];
        
    //console.log(data.datasets[1]);
    //y enviamos
    res.send(data);
  });  
};
