var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Persons Dimension Model
*/
var CurrenciesDim = db.define('currencies_dimension', {
  //llave foranea a ubicacion geográfica
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = {
  CurrenciesDim: CurrenciesDim
};
