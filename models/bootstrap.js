var db = require('../config/database');
var sourceDb = require('../config/oltpdatabase');
var Sequelize = require('sequelize');

var helpers = require('../helpers/helperFunctions');

var CurrencyRatesFact = require('./CurrencyRatesFact').CurrencyRatesFact;

var CustomersDimension = require('./CustomersDimension').CustomersDimension;

var ProductCategoriesDimension = require('./ProductCategoriesDimension').ProductCategoriesDimension;

var ProductsDimension = require('./ProductsDimension').ProductsDimension;

var SaleReasonsDimension = require('./SaleReasonsDimension').SaleReasonsDimension;

var SalesPersonsDimension = require('./SalesPersonsDimension').SalesPersonsDimension;

var SaleTerritoriesDimension = require('./SaleTerritoriesDimension').SaleTerritoriesDimension;

var ShipMethodsDimension = require('./ShipMethodsDimension').ShipMethodsDimension;

var SpecialOffersDimension = require('./SpecialOffersDimension').SpecialOffersDimension;

var SalesOrdersFact = require('./SalesOrdersFact').SalesOrdersFact;

var SalesOrderDetailsFact = require('./SalesOrderDetailsFact').SalesOrderDetailsFact;

var SalesOrderReasonsFact = require('./SalesOrderReasonsFact').SalesOrderReasonsFact;

var DatesDimension = require('./DatesDimension').DatesDimension;

var CurrenciesDimension = require('./CurrenciesDimension').CurrenciesDimension;
//sync model
db.sync({
  force: true
}).then(function() {
  var datesRanges = null;
  var currenciesRanges = null;
  console.log("loading dimensions...");
  //extract, transform & load dates Dimension
  sourceDb.query("SELECT MIN(cr.currencyratedate) AS mindate, MAX(cr.currencyratedate) AS maxdate, CONCAT(EXTRACT(YEAR FROM cr.currencyratedate),EXTRACT(MONTH FROM cr.currencyratedate)) AS datename FROM Sales.CurrencyRate cr GROUP BY datename ORDER BY mindate ASC", { type: sourceDb.QueryTypes.SELECT})
  .then(function(dates) {
        console.log("found "+dates.length+" records");
        //copy date ranges to process load data without load dates ranges again
        datesRanges = dates;
        //transfrom & load to DWH Dimension
        DatesDimension.bulkCreate(helpers.transformDates(dates));
        console.log("Dates dimension Uploaded");
    });

  //extract, transform & load currencies Dimension
  sourceDb.query("SELECT cur.currencycode,cur.name FROM Sales.Currency cur", { type: sourceDb.QueryTypes.SELECT})
  .then(function(currencies) {
    console.log("found "+currencies.length+" records");
    //transfrom & load to DWH Dimension
    CurrenciesDimension.bulkCreate(helpers.transformCurrencies(currencies))
    .then(function() {
      return CurrenciesDimension.findAll();
    }).then(function(newCurrencies) {
      currenciesRanges = newCurrencies;
      console.log(currenciesRanges);
    });
    console.log("Currencies dimension Uploaded");
  });

  //extract, transform & load currency rates facts
  sourceDb.query("SELECT * FROM Sales.CurrencyRate", { type: sourceDb.QueryTypes.SELECT})
  .then(function(currencyRates) {
    console.log("found "+currencyRates.length+" records");
    //transfrom & load to DWH Dimension
    CurrencyRatesFact.bulkCreate(helpers.transformCurrencyRates(currencyRates,currenciesRanges,datesRanges));

    console.log("Currencies Rates Facts Uploaded");
  });

  //extract Sales Reasons data from sourceDb
  sourceDb.query("SELECT * FROM Sales.SalesReason", { type: sourceDb.QueryTypes.SELECT})
  .then(function(reasons) {
    console.log("found "+reasons.length+" records");
    //transfrom & load to DWH Dimension
    SaleReasonsDimension.bulkCreate(helpers.transformSalesReasons(reasons));
    console.log("Sales Reasons Uploaded");
  });

  //extract product categories & subcategories data from sourceDb
  sourceDb.query("SELECT psc.ProductSubcategoryId, pc.ProductCategoryID, pc.Name AS category_name,psc.Name AS subcategory_name FROM Production.ProductCategory pc RIGHT JOIN Production.ProductSubcategory psc ON psc.ProductCategoryID = pc.ProductCategoryID", { type: sourceDb.QueryTypes.SELECT})
  .then(function(categories) {
    console.log("found "+categories.length+" records");
    //transfrom & load to DWH Dimension
    ProductCategoriesDimension.bulkCreate(helpers.transformProductCategories(categories));
    console.log("Product Categories Uploaded");
  });

  //extract products data from sourceDb
  sourceDb.query("SELECT pr.ProductID, pr.Name, pr.MakeFlag, pr.FinishedGoodsFlag,pr.Color,pr.StandardCost,pr.ListPrice,COALESCE(pr.ProductSubcategoryID,-1) AS ProductSubcategoryID FROM Production.Product pr ", { type: sourceDb.QueryTypes.SELECT})
  .then(function(products) {
      console.log("found "+products.length+" records");
      //transfrom & load to DWH Dimension
      ProductsDimension.bulkCreate(helpers.transformProducts(products));
      console.log("Products Uploaded");
    });

  //extract special offers data from sourceDb
  sourceDb.query("SELECT so.SpecialOfferID, so.Description, so.DiscountPct, so.Type, so.Category, so.StartDate, so.EndDate, so.MinQty, so.MaxQty FROM Sales.SpecialOffer so", { type: sourceDb.QueryTypes.SELECT})
  .then(function(specialOffers) {
        console.log("found "+specialOffers.length+" records");
        //transfrom & load to DWH Dimension
        SpecialOffersDimension.bulkCreate(helpers.transformSpecialOffers(specialOffers));
        console.log("Special offers Uploaded");
    });

  console.log("Dimensional model created");
  return true;
});

module.exports = {
  CurrenciesDimension: CurrenciesDimension,
  CurrencyRatesFact: CurrencyRatesFact,
  CustomersDimension: CustomersDimension,
  ProductCategoriesDimension : ProductCategoriesDimension,
  ProductsDimension: ProductsDimension,
  SaleReasonsDimension: SaleReasonsDimension,
  SalesOrderDetailsFact: SalesOrderDetailsFact,
  SalesOrderReasonsFact: SalesOrderReasonsFact,
  SalesOrdersFact: SalesOrdersFact,
  SalesPersonsDimension: SalesPersonsDimension,
  SaleTerritoriesDimension: SaleTerritoriesDimension,
  ShipMethodsDimension: ShipMethodsDimension,
  SpecialOffersDimension: SpecialOffersDimension
};
