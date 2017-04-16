var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale reason Dimension Model
*/
var SaleReasonsDimension = db.define('sale_reasons_dimension', {
  //llave foranea a ubicacion geográfica
  name: Sequelize.STRING,
  reasonType: Sequelize.STRING
});

module.exports = {
  SaleReasonsDimension: SaleReasonsDimension
};
