var db = require('../config/database');
var Sequelize = require('sequelize');
var SalesOrdersFact = require('./SalesOrdersToStoreFact').SalesOrdersToStoreFact;
var SaleReasonsDimension = require('./SaleReasonsDimension').SaleReasonsDimension;

/*
Sale reason Dimension Model
*/
var SalesOrderToStoreReasonsFact = db.define('sales_order_reasons_fact', {
  //llave foranea a ubicacion geográfica
  salesOrderId: {
    type: Sequelize.INTEGER,
    references: {
      model: SalesOrdersToStoreFact,
      key: 'SalesOrderId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  saleReasonId: {
    type: Sequelize.INTEGER,
    references: {
      model: SaleReasonsDimension,
      key: 'salesReasonId',
      deferrable: Sequelize.Deferrable.NOT
    }
  }
});

module.exports = {
  SalesOrderToStoreReasonsFact: SalesOrderToStoreReasonsFact
};
