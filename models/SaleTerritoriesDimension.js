var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale territories Dimension Model
*/
var SaleTerritoriesDimension = db.define('sale_territories_dimension', {
  //llave foranea a ubicacion geográfica
  name: Sequelize.STRING,
  countryRegion: Sequelize.STRING,
  group: Sequelize.STRING,
  salesYearToDate: Sequelize.DOUBLE,
  salesLastYear: Sequelize.DOUBLE,
  costYearToDate: Sequelize.DOUBLE,
  costLastyear: Sequelize.DOUBLE
});

module.exports = {
  SaleTerritoriesDimension: SaleTerritoriesDimension
};
