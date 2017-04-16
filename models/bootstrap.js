var db = require('../config/database');
var Sequelize = require('sequelize');

var CurrencyRatesDimension = require('./CurrencyRatesDimension').CurrencyRatesDimension;

var SaleReasonsDimension = require('./SaleReasonsDimension').SaleReasonsDimension;

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
  SpecialOffersDimension: SpecialOffersDimension
};
