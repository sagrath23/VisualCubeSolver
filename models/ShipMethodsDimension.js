var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale territories Dimension Model
*/
var ShipMethodsDimension = db.define('ship_methods_dimension', {
  //llave foranea a ubicacion geográfica
  name: Sequelize.STRING,
  shipBase: Sequelize.DOUBLE,
  shipRate: Sequelize.DOUBLE
});

module.exports = {
  ShipMethodsDimension: ShipMethodsDimension
};
