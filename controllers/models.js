var db = require('../config/database');
var sourceDb = require('../config/oltpdatabase');
var Sequelize = require('sequelize');

var helpers = require('../helpers/helperFunctions');

var Models = require('../models/bootstrap');

exports.sync = function(req, res, next) {
  console.log("loading dimensions...");
  var currenciesRanges = [];
  //extract, transform & load dates Dimension
  sourceDb.query(
      "SELECT MIN(cr.currencyratedate) AS mindate, MAX(cr.currencyratedate) AS maxdate, CONCAT(EXTRACT(YEAR FROM cr.currencyratedate),EXTRACT(MONTH FROM cr.currencyratedate)) AS datename FROM Sales.CurrencyRate cr GROUP BY datename ORDER BY mindate ASC", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(dates) {
      console.log("found " + dates.length + " dates records...");
      //copy date ranges to process load data without load dates ranges again
      datesRanges = dates;
      //transfrom & load to DWH Dimension
      Models.DatesDimension.bulkCreate(helpers.transformDates(dates))
        .then(function() {
          return Models.DatesDimension.findAll();
        })
        .then(function(DatesDimension) {
          console.log("Dates dimension Uploaded");
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
                }).then(function(newCurrencies) {
                  console.log("Currencies Dimension uploaded");
                  //extract, transform & load currency rates facts
                  sourceDb.query("SELECT * FROM Sales.CurrencyRate", {
                      type: sourceDb.QueryTypes.SELECT
                    })
                    .then(function(currencyRates) {
                      console.log("found " + currencyRates.length +
                        " currency rates records");
                      //transfrom & load to DWH Dimension
                      console.log(Models);
                      if (typeof Models.CurrencyRatesFact !=
                        'undefined') {
                        Models.CurrencyRatesFact.bulkCreate(helpers
                          .transformCurrencyRates(
                            currencyRates, newCurrencies,
                            datesRanges)).then(function() {
                          console.log(
                            "Currencies Rates Facts Uploaded"
                          );
                        });
                        console.log(
                          "Currencies Rates Facts Uploaded");
                      } else {
                        console.log('Fuck that nigga shit...');
                      }

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
        categories)).then(function() {
        console.log("Product Categories Uploaded");
      });

    });

  //extract products data from sourceDb
  sourceDb.query(
      "SELECT pr.ProductID, pr.Name, pr.MakeFlag, pr.FinishedGoodsFlag,pr.Color,pr.StandardCost,pr.ListPrice,COALESCE(pr.ProductSubcategoryID,-1) AS ProductSubcategoryID FROM Production.Product pr ", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(products) {
      console.log("found " + products.length + " records");
      //transfrom & load to DWH Dimension
      Models.ProductsDimension.bulkCreate(helpers.transformProducts(
        products));
      console.log("Products Uploaded");
    });

  //extract special offers data from sourceDb
  sourceDb.query(
      "SELECT so.SpecialOfferID, so.Description, so.DiscountPct, so.Type, so.Category, so.StartDate, so.EndDate, so.MinQty, so.MaxQty FROM Sales.SpecialOffer so", {
        type: sourceDb.QueryTypes.SELECT
      })
    .then(function(specialOffers) {
      console.log("found " + specialOffers.length + " records");
      //transfrom & load to DWH Dimension
      Models.SpecialOffersDimension.bulkCreate(helpers.transformSpecialOffers(
        specialOffers));
      console.log("Special offers Uploaded");
    });

  res.send("Model created");
};
