//datawharehouse connection
var db = require('../config/database');
//source relational database connection
var sourceDb = require('../config/oltpdatabase');
//ORM
var Sequelize = require('sequelize');
//Promise Manager
var Promise = require('bluebird');

//transform functions
var helpers = require('../helpers/helperFunctions');
//datawharehouse dimensions & facts
var Models = require('../models/bootstrap');

exports.sync = function(req, res, next) {
  console.log("loading dimensions");

  var currenciesAndDatesData = [],
      currencyRatesDependencies = [],
      customerDependencies
      salesOrdersDependencies = [],
      salesOrderDetailsDependencies = [],
      output = "";

  //get dates data
  currenciesAndDatesData.push(sourceDb.query("SELECT MIN(cr.currencyratedate) AS mindate, MAX(cr.currencyratedate) AS maxdate, CONCAT(EXTRACT(YEAR FROM cr.currencyratedate),EXTRACT(MONTH FROM cr.currencyratedate)) AS datename FROM Sales.CurrencyRate cr GROUP BY datename ORDER BY mindate ASC", { type: sourceDb.QueryTypes.SELECT }));

  //and get currencies data
  currenciesAndDatesData.push(sourceDb.query("SELECT cur.currencycode,cur.name FROM Sales.Currency cur", { type: sourceDb.QueryTypes.SELECT }));

  //and wait for responses
  Promise.all(currenciesAndDatesData).then(function(responses){
    console.log("Dates & Currencies data loaded");
    //when the results arrive, we pass it to the data wharehouse
    console.log(" dates founded: "+responses[0].length+"<br>");
    console.log(" currencies founded: "+responses[1].length+"<br>");
    currencyRatesDependencies.push(Models.DatesDimension.bulkCreate(helpers.transformDates(responses[0])).then(function(){ return Models.DatesDimension.findAll();}));
    //push DateDimension dependency on sales Orders Dependencies
    salesOrdersDependencies.push(currencyRatesDependencies[0]);

    currencyRatesDependencies.push(Models.CurrenciesDimension.bulkCreate(helpers.transformCurrencies(responses[1])).then(function() { return Models.CurrenciesDimension.findAll();}));    
    
    //and sync responses
    Promise.all(currencyRatesDependencies).then(
      function(dwhResponses){
        console.log("Dates & currencies data transform and loaded into datawharehouse");

        //now, we load currency rates facts in the datawharehouse
        sourceDb.query("SELECT * FROM Sales.CurrencyRate", {type: sourceDb.QueryTypes.SELECT}).then(
          function(currencyRates) {
            //transfrom & load to DWH Dimension
            console.log(" currency rates founded: "+currencyRates.length+"<br>");
            Models.CurrencyRatesFact.bulkCreate(helpers.transformCurrencyRates(currencyRates, dwhResponses[1], dwhResponses[0])).then(function(){ console.log("currency rates facts loaded.");});
          });
      });
  });

  //extract Sales Reasons data from sourceDb
  sourceDb.query("SELECT * FROM Sales.SalesReason", { type: sourceDb.QueryTypes.SELECT })
    .then(function(reasons) {
      //transfrom & load to DWH Dimension
      console.log(" sales reasons founded: "+reasons.length+"<br>");
      Models.SaleReasonsDimension.bulkCreate(helpers.transformSalesReasons(reasons))
        .then(function() {
          console.log("Sales Reasons Dimension Uploaded");
        });
    });

  //extract ShipMethods data from sourceDb
  salesOrdersDependencies.push(sourceDb.query("SELECT * FROM Purchasing.ShipMethod", { type: sourceDb.QueryTypes.SELECT })
    .then(function(shipMethods) {
      console.log("shipMethods founded: "+shipMethods.length+"<br>");
      //transfrom & load to DWH Dimension
      return Models.ShipMethodsDimension.bulkCreate(helpers.transformShipMethods(shipMethods));
    }));

  //extract product categories & subcategories data from sourceDb
  Promise.all([sourceDb.query("SELECT psc.ProductSubcategoryId, pc.ProductCategoryID, pc.Name AS category_name,psc.Name AS subcategory_name FROM Production.ProductCategory pc RIGHT JOIN Production.ProductSubcategory psc ON psc.ProductCategoryID = pc.ProductCategoryID", { type: sourceDb.QueryTypes.SELECT })
    .then(function(categories) {
      console.log("Product categories founded: "+categories.length+"<br>");
      //transfrom & load to DWH Dimension
      return Models.ProductCategoriesDimension.bulkCreate(helpers.transformProductCategories(categories));
    })])
    .then(function(responses){
      console.log("Categories & subcategories transform and loaded");

      //extract products data from sourceDb
      sourceDb.query("SELECT pr.ProductID, pr.Name, pr.MakeFlag, pr.FinishedGoodsFlag,pr.Color,pr.StandardCost,pr.ListPrice,COALESCE(pr.ProductSubcategoryID,-1) AS ProductSubcategoryID FROM Production.Product pr ", { type: sourceDb.QueryTypes.SELECT })
        .then(function(products) {
          console.log("Products founded: "+products.length+"<br>");
          //transfrom & load to DWH Dimension
          salesOrderDetailsDependencies.push(Models.ProductsDimension.bulkCreate(helpers.transformProducts(products)));
        });
    });

  //extract special offers data from sourceDb
  sourceDb.query("SELECT so.SpecialOfferID, so.Description, so.DiscountPct, so.Type, so.Category, so.StartDate, so.EndDate, so.MinQty, so.MaxQty FROM Sales.SpecialOffer so", { type: sourceDb.QueryTypes.SELECT })
    .then(function(specialOffers) {
      //transfrom & load to DWH Dimension
      console.log("Special offers founded: "+specialOffers.length+"<br>");
      salesOrderDetailsDependencies.push(Models.SpecialOffersDimension.bulkCreate(helpers.transformSpecialOffers(specialOffers)));
    });    
    
  //extract customers data from sourceDb
  //we took all records that StoreID is NULL
  salesOrdersDependencies.push(sourceDb.query("SELECT cus.CustomerID, per.Title, per.FirstName, per.MiddleName, per.LastName FROM Sales.Customer cus INNER JOIN Person.Person per ON per.BusinessEntityID = cus.PersonID WHERE cus.PersonID IS NOT NULL AND cus.StoreID IS NULL", { type: sourceDb.QueryTypes.SELECT })
    .then(function(customers) {
      console.log("Customers founded: "+customers.length+"<br>");
      //transfrom & load to DWH Dimension
      return Models.CustomersDimension.bulkCreate(helpers.transformCustomers(customers));
    }));  

  //extract sales territories data from sourceDb
  salesOrdersDependencies.push(sourceDb.query("SELECT * FROM Sales.SalesTerritory", { type: sourceDb.QueryTypes.SELECT })
    .then(function(salesTerritories) {
      //transfrom & load to DWH Dimension
      console.log("sales territories founded: "+salesTerritories.length+"<br>");
      return Models.SaleTerritoriesDimension.bulkCreate(helpers.transformSaleTerritories(salesTerritories));
    }));  

  //extract sales persons data from sourceDb
  salesOrdersDependencies.push(sourceDb.query("SELECT sp.BusinessEntityID, per.Title, per.FirstName, per.MiddleName, per.LastName, sp.SalesQuota, sp.Bonus, sp.CommissionPct, sp.SalesYTD, sp.SalesLastYear FROM Sales.SalesPerson sp INNER JOIN Person.Person per ON per.BusinessEntityID = sp.BusinessEntityID", { type: sourceDb.QueryTypes.SELECT })
    .then(function(salesPersons) {
      console.log("sales persons founded: "+salesPersons.length+"<br>");
      //transfrom & load to DWH Dimension
      return Models.SalesPersonsDimension.bulkCreate(helpers.transformSalePersons(salesPersons));
    }));
    

  Promise.all(salesOrdersDependencies).then(function(responses){
    console.log("Sync all dimensions to load Sales orders");
    //extract Sales Orders from sourceDb  
    sourceDb.query("SELECT so.SalesOrderID, so.RevisionNumber, so.OrderDate, so.dueDate, so.ShipDate, so.Status, so.OnlineOrderFlag, so.PurchaseOrderNumber, so.AccountNumber, so.CustomerID, so.SalesPersonID, so.TerritoryID, so.ShipMethodID, so.TaxAmt, so.Freight, so.TotalDue, so.Comment FROM Sales.SalesOrderHeader so WHERE so.CustomerID IN (SELECT cus.CustomerID FROM Sales.Customer cus INNER JOIN Person.Person per ON per.BusinessEntityID = cus.PersonID WHERE cus.PersonID IS NOT NULL AND cus.StoreID IS NULL)", { type: sourceDb.QueryTypes.SELECT })
      .then(function(salesOrders) {
        console.log("sales orders founded: "+salesOrders.length+"<br>");
        //transfrom & load to DWH Dimension
        Promise.all([Models.SalesOrdersFact.bulkCreate(helpers.transformSalesOrders(salesOrders, responses[0])).then(function(){ return Models.SalesOrdersFact.findAll(); })]).then(function(response){
          console.log("sales order added");
          console.log(response[0]);
        });
      });  
  });  
  //send response to view while we do all the stuff in background
  res.send("AdventureWorks Data Warehouse Model Synchronization Success!");
};

/*
var db = require('../config/database');
var sourceDb = require('../config/oltpdatabase');
var Sequelize = require('sequelize');


var helpers = require('../helpers/helperFunctions');

var Models = require('../models/bootstrap');

exports.sync = function(req, res, next) {
  var productDependencies = [],
    datesRanges = [],
    promises = [],
    currenciesRanges = [];
  console.log("loading dimensions...");


  //fix this shit to work with bluebird
  //extract, transform & load dates Dimension
  sourceDb.query(
      "SELECT MIN(cr.currencyratedate) AS mindate, MAX(cr.currencyratedate) AS maxdate, CONCAT(EXTRACT(YEAR FROM cr.currencyratedate),EXTRACT(MONTH FROM cr.currencyratedate)) AS datename FROM Sales.CurrencyRate cr GROUP BY datename ORDER BY mindate ASC", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(dates) {
      console.log("found " + dates.length + " dates records...");
      //transfrom & load to DWH Dimension
      Models.DatesDimension.bulkCreate(helpers.transformDates(
          dates))
        .then(function() {
          //get dimension to sync with all the data
          return Models.DatesDimension.findAll();
        })
        .then(function(DatesDimension) {
          console.log("Dates dimension Uploaded");
          datesRanges = DatesDimension;

          console.log(
            "trying to sync currencies dimensions & currencies rates facts..."
          );
          //extract, transform & load currencies Dimension
          sourceDb.query(
              "SELECT cur.currencycode,cur.name FROM Sales.Currency cur", {
                type: sourceDb.QueryTypes.SELECT
              })
            .then(function(currencies) {
              console.log("found " + currencies.length +
                " currencies records");
              //transfrom & load to DWH Dimension
              Models.CurrenciesDimension.bulkCreate(helpers.transformCurrencies(
                  currencies))
                .then(function() {
                  return Models.CurrenciesDimension.findAll();
                }).then(function(CurrenciesDimension) {
                  console.log("Currencies Dimension uploaded");
                  //extract, transform & load currency rates facts
                  sourceDb.query("SELECT * FROM Sales.CurrencyRate", {
                      type: sourceDb.QueryTypes.SELECT
                    })
                    .then(function(currencyRates) {
                      console.log("found " + currencyRates.length +
                        " currency rates records");
                      //transfrom & load to DWH Dimension
                      Models.CurrencyRatesFact.bulkCreate(helpers
                        .transformCurrencyRates(
                          currencyRates, CurrenciesDimension,
                          DatesDimension)).then(function() {
                        console.log(
                          "Currencies Rates Facts Uploaded"
                        );
                      });
                    });

                });
              console.log("Currencies dimension Uploaded");
            });
        });
    });

  //extract Sales Reasons data from sourceDb
  sourceDb.query("SELECT * FROM Sales.SalesReason", {
      type: sourceDb.QueryTypes.SELECT
    })
    .then(function(reasons) {
      console.log("found " + reasons.length + " sales reasons records");
      //transfrom & load to DWH Dimension
      Models.SaleReasonsDimension.bulkCreate(helpers.transformSalesReasons(
        reasons)).then(function() {
        console.log("Sales Reasons Dimension Uploaded");
      });
    });

  //extract ShipMethods data from sourceDb
  sourceDb.query("SELECT * FROM Purchasing.ShipMethod", {
      type: sourceDb.QueryTypes.SELECT
    })
    .then(function(shipMethods) {
      console.log("found " + shipMethods.length + " shipMethiodsrecords");
      //transfrom & load to DWH Dimension
      Models.ShipMethodsDimension.bulkCreate(helpers.transformShipMethods(
        shipMethods)).then(function() {
        console.log("Sales Reasons Dimension Uploaded");
      });
    });

  //extract product categories & subcategories data from sourceDb
  sourceDb.query(
      "SELECT psc.ProductSubcategoryId, pc.ProductCategoryID, pc.Name AS category_name,psc.Name AS subcategory_name FROM Production.ProductCategory pc RIGHT JOIN Production.ProductSubcategory psc ON psc.ProductCategoryID = pc.ProductCategoryID", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(categories) {
      console.log("found " + categories.length +
        " product categories records");
      //transfrom & load to DWH Dimension
      Models.ProductCategoriesDimension.bulkCreate(helpers.transformProductCategories(
          categories))
        .then(function() {
          console.log("product categories loaded");
          //extract products data from sourceDb
          sourceDb.query(
              "SELECT pr.ProductID, pr.Name, pr.MakeFlag, pr.FinishedGoodsFlag,pr.Color,pr.StandardCost,pr.ListPrice,COALESCE(pr.ProductSubcategoryID,-1) AS ProductSubcategoryID FROM Production.Product pr ", {
                type: sourceDb.QueryTypes.SELECT
              })
            .then(function(products) {
              console.log("found " + products.length +
                " products records");
              //transfrom & load to DWH Dimension
              promises.push(Models.ProductsDimension.bulkCreate(helpers
                .transformProducts(
                  products)));
              console.log("Products Uploaded");
            });
        });
    });

  //extract special offers data from sourceDb
  sourceDb.query(
      "SELECT so.SpecialOfferID, so.Description, so.DiscountPct, so.Type, so.Category, so.StartDate, so.EndDate, so.MinQty, so.MaxQty FROM Sales.SpecialOffer so", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(specialOffers) {
      console.log("found " + specialOffers.length +
        " special offers records");
      //transfrom & load to DWH Dimension
      Models.SpecialOffersDimension.bulkCreate(helpers.transformSpecialOffers(
        specialOffers));
      console.log("Special offers Uploaded");
    });

  //extract customers data from sourceDb
  sourceDb.query(
      //selecciono solo los clientes que son personas
      "SELECT cus.CustomerID, per.Title, per.FirstName, per.MiddleName, per.LastName FROM Sales.Customer cus INNER JOIN Person.Person per ON per.BusinessEntityID = cus.PersonID WHERE cus.PersonID IS NOT NULL AND cus.StoreID IS NULL", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(customers) {
      console.log("found " + customers.length + " customers records");
      //console.log(customers);
      //transfrom & load to DWH Dimension
      Models.CustomersDimension.bulkCreate(helpers.transformCustomers(
          customers))
        .then(function() {
          sourceDb.query(
              "SELECT so.SalesOrderID, so.RevisionNumber, so.OrderDate, so.dueDate, so.ShipDate, so.Status, so.OnlineOrderFlag, so.PurchaseOrderNumber, so.AccountNumber, so.CustomerID, so.SalesPersonID, so.TerritoryID, so.ShipMethodID, so.TaxAmt, so.Freight, so.TotalDue, so.Comment FROM Sales.SalesOrderHeader so WHERE so.CustomerID IN (SELECT cus.CustomerID FROM Sales.Customer cus INNER JOIN Person.Person per ON per.BusinessEntityID = cus.PersonID WHERE cus.PersonID IS NOT NULL AND cus.StoreID IS NULL)", {
                type: sourceDb.QueryTypes.SELECT
              })
            .then(function(salesOrders) {
              console.log("found " + salesOrders.length +
                " sales orders records");
              //transfrom & load to DWH Dimension
              Models.SalesOrdersFact.bulkCreate(helpers.transformSalesOrders(
                salesOrders, datesRanges));
              console.log("Sales orders Uploaded");
            });
        });
      console.log("Customers Uploaded");
    });

  //extract sales territories data from sourceDb
  sourceDb.query("SELECT * FROM Sales.SalesTerritory", {
      type: sourceDb.QueryTypes.SELECT
    })
    .then(function(salesTerritories) {
      console.log("found " + salesTerritories.length +
        " sales territories records");
      //console.log(salesTerritories);
      //transfrom & load to DWH Dimension
      Models.SaleTerritoriesDimension.bulkCreate(helpers.transformSaleTerritories(
        salesTerritories));
      console.log("SalesTerritories Uploaded");
    });

  //extract sales persons data from sourceDb
  sourceDb.query(
      "SELECT sp.BusinessEntityID, per.Title, per.FirstName, per.MiddleName, per.LastName, sp.SalesQuota, sp.Bonus, sp.CommissionPct, sp.SalesYTD, sp.SalesLastYear FROM Sales.SalesPerson sp INNER JOIN Person.Person per ON per.BusinessEntityID = sp.BusinessEntityID", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(salesPersons) {
      console.log("found " + salesPersons.length + " sales persons records");

      //transfrom & load to DWH Dimension
      Models.SalesPersonsDimension.bulkCreate(helpers.transformSalePersons(
        salesPersons));
      console.log("SalesPersons Uploaded");
    });
  res.send("AdventureWorks Data Warehouse Model Synchronization Success!");
};
*/
