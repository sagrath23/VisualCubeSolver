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
var SalesOrdersFact = db.define('sales_orders_fact', {
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
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  salePersonId: {
    type: Sequelize.INTEGER,
    references: {
      model: SalesPersonsDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  territoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: SaleTerritoriesDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  shipMethodId: {
    type: Sequelize.INTEGER,
    references: {
      model: ShipMethodsDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  currencyRateId: {
    type: Sequelize.INTEGER,
    references: {
      model: CurrencyRatesDimension,
      key: 'id',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  taxAmount: Sequelize.DOUBLE,
  freight: Sequelize.DOUBLE,
  totalDue: Sequelize.DOUBLE,
  comment: Sequelize.TEXT
});

module.exports = {
  SalesOrdersFact: SalesOrdersFact
};
