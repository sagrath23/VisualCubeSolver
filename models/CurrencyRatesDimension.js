var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale territories Dimension Model
*/
var ShipMethodsDimension = db.define('ship_methods_dimension', {
  //llave foranea a ubicacion geográfica
  currencyRateDate: Sequelize.DATE,
  fromCurrencyCode: Sequelize.STRING,
  toCurrencyCode: Sequelize.STRING,
  averrageRate: Sequelize.DOUBLE,
  endOfDateRate: Sequelize.DOUBLE
});

module.exports = {
  ShipMethodsDimension: ShipMethodsDimension
};
