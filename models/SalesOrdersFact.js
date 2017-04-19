var db = require('../config/database');
var Sequelize = require('sequelize');
var DatesDimension = require('./DatesDimension').DatesDimension;
var CustomersDimension = require('./CustomersDimension').CustomersDimension;
var SalesPersonsDimension = require('./SalesPersonsDimension').SalesPersonsDimension;
var SaleTerritoriesDimension = require('./SaleTerritoriesDimension').SaleTerritoriesDimension;
var ShipMethodsDimension = require('./ShipMethodsDimension').ShipMethodsDimension;
var CurrenciesDimension = require('./CurrenciesDimension').CurrenciesDimension;

/*
Sale reason Dimension Model
*/
var SalesOrdersFact = db.define('sales_orders_fact', {
  SalesOrderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  revisionNumber: Sequelize.INTEGER,
  dateDimensionId: {
    type: Sequelize.INTEGER,
    references: {
      model: DatesDimension,
      key: 'dateDimensionId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
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
      key: 'customerId',
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
      key: 'SalesTerritoryId',
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
  currencyId: {
    type: Sequelize.INTEGER,
    references: {
      model: CurrenciesDimension,
      key: 'currencyId',
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
