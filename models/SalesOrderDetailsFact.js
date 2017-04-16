var db = require('../config/database');
var Sequelize = require('sequelize');
var SalesOrderFact = require('./SalesOrderFact').SalesOrderFact;
var ProductsDimension = require('./ProductsDimension').ProductsDimension;
var SpecialOffersDimension = require('./SpecialOffersDimension').SpecialOffersDimension;

/*
Sale reason Dimension Model
*/
var SalesOrderDetailsFact = db.define('sales_order_details_fact', {
  //llave foranea a ubicacion geográfica
  salesOrderId: {
    type: Sequelize.INTEGER,
    references: {
      model: SalesOrderFact,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  carrierTrackingNumber: Sequelize.STRING,
  orderQuantity: Sequelize.INTEGER,
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: ProductsDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  specialOfferId: {
    type: Sequelize.INTEGER,
    references: {
      model: SpecialOffersDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  unitPrice: Sequelize.DOUBLE,
  unitPriceDiscount: Sequelize.DOUBLE,
  lineTotal: Sequelize.DOUBLE
});

module.exports = {
  SalesOrderDetailsFact: SalesOrderDetailsFact
};
