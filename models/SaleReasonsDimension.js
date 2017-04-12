var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Persons Dimension Model
*/
var SaleReasonsDim = db.define('sale_reasons_dimension', {
  //llave foranea a ubicacion geográfica
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  saleReasonName: {
    type: Sequelize.STRING
  },
  saleReasonType: {
    type: Sequelize.STRING
  }
});

module.exports = {
  SaleReasonsDim: SaleReasonsDim
};
