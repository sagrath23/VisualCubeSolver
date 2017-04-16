var db = require('../config/database');
var Sequelize = require('sequelize');

var CurrencyRatesDimension = require('./CurrencyRatesDimension').CurrencyRatesDimension;

var CustomersDimension = require('./CustomersDimension').CustomersDimension;

var ProductCategoriesDimension = require('./ProductCategoriesDimension').ProductCategoriesDimension;

var ProductsDimension = require('./ProductsDimension').ProductsDimension;

var SaleReasonsDimension = require('./SaleReasonsDimension').SaleReasonsDimension;

var SalesPersonsDimension = require('./SalesPersonsDimension').SalesPersonsDimension;

var SaleTerritoriesDimension = require('./SaleTerritoriesDimension').SaleTerritoriesDimension;

var ShipMethodsDimension = require('./ShipMethodsDimension').ShipMethodsDimension;

var SpecialOffersDimension = require('./SpecialOffersDimension').SpecialOffersDimension;
//sync model
db.sync({
  force: true
}).then(function() {

  console.log("Dimensional model created");

  return true;
});

module.exports = {
  CurrencyRatesDimension: CurrencyRatesDimension,
  SaleReasonsDimension: SaleReasonsDimension,
  SaleTerritoriesDimension: SaleTerritoriesDimension,
  ShipMethodsDimension: ShipMethodsDimension,
  SpecialOffersDimension: SpecialOffersDimension,
  SalesPersonsDimension: SalesPersonsDimension,
  CustomersDimension: CustomersDimension
};
