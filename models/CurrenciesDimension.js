var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale territories Dimension Model
*/
var CurrenciesDimension = db.define('currencies_dimension', {
  currencyId:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  currencyCode: Sequelize.STRING,
  name: Sequelize.STRING
});

module.exports = {
  CurrenciesDimension: CurrenciesDimension
};
