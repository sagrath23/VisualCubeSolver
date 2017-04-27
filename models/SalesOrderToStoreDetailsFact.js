var db = require('../config/database');
var Sequelize = require('sequelize');
var SalesOrdersToStoreFact = require('./SalesOrdersToStoreFact').SalesOrdersToStoreFact;
var ProductsDimension = require('./ProductsDimension').ProductsDimension;
var SpecialOffersDimension = require('./SpecialOffersDimension').SpecialOffersDimension;

/*
Sale reason Dimension Model
*/
var SalesOrderToStoreDetailsFact = db.define('sales_order_to_store_details_fact', {
  SalesOrderDetailId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  salesOrderId: {
    type: Sequelize.INTEGER,
    references: {
      model: SalesOrdersToStoreFact,
      key: 'SalesOrderId',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  carrierTrackingNumber: Sequelize.STRING,
  orderQuantity: Sequelize.INTEGER,
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: ProductsDimension,
      key: 'ProductId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  specialOfferId: {
    type: Sequelize.INTEGER,
    references: {
      model: SpecialOffersDimension,
      key: 'SpecialOfferID',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  unitPrice: Sequelize.DOUBLE,
  unitPriceDiscount: Sequelize.DOUBLE,
  lineTotal: Sequelize.DOUBLE
});

module.exports = {
  SalesOrderToStoreDetailsFact: SalesOrderToStoreDetailsFact
};
