var db = require('../config/database');
var Sequelize = require('sequelize');
var CustomersDimension = require('./CustomersDimension').CustomersDimension;
var SalesPersonsDimension = require('./SalesPersonsDimension').SalesPersonsDimension;
var SaleTerritoriesDimension = require('./SaleTerritoriesDimension').SaleTerritoriesDimension;
var ShipMethodsDimension = require('./ShipMethodsDimension').ShipMethodsDimension;
var CurrencyRatesDimension = require('./CurrencyRatesDimension').CurrencyRatesDimension;

/*
Sale reason Dimension Model
*/
var SalesOrderFact = db.define('sales_orders_fact', {
  //llave foranea a ubicacion geográfica
  revisionNumber: Sequelize.INTEGER,
  orderDate: Sequelize.DATE,
  dueDate: Sequelize.DATE,
  shipDate: Sequelize.DATE,
  status: Sequelize.INTEGER,
  onlineOrderFlag: Sequelize.BOOLEAN,
  purchaseOrderNumber: Sequelize.STRING,
  accountNumber: Sequelize.STRING,
  customerId: {
    type: Sequelize.INTEGER,
    references: {
      model: CustomersDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  salePersonId: {
    type: Sequelize.INTEGER,
    references: {
      model: SalesPersonsDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  territoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: SaleTerritoriesDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  shipMethodId: {
    type: Sequelize.INTEGER,
    references: {
      model: ShipMethodsDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  currencyRateId: {
    type: Sequelize.INTEGER,
    references: {
      model: CurrencyRateDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  taxAmount: Sequelize.DOUBLE,
  freight: Sequelize.DOUBLE,
  totalDue: Sequelize.DOUBLE,
  comment: Sequelize.TEXT
});

module.exports = {
  SalesOrderFact: SalesOrderFact
};
