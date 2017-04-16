var db = require('../config/database');
var Sequelize = require('sequelize');
var SalesOrderFact = require('./SalesOrderFact').SalesOrderFact;
var SaleReasonsDimension = require('./SaleReasonsDimension').SaleReasonsDimension;

/*
Sale reason Dimension Model
*/
var SalesOrderReasonsFact = db.define('sales_order_reasons_fact', {
  //llave foranea a ubicacion geográfica
  salesOrderId: {
    type: Sequelize.INTEGER,
    references: {
      model: SalesOrderFact,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  saleReasonId: {
    type: Sequelize.INTEGER,
    references: {
      model: SaleReasonsDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

module.exports = {
  SalesOrderReasonsFact: SalesOrderReasonsFact
};
