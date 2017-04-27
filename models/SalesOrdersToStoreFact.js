var db = require('../config/database');
var Sequelize = require('sequelize');
var DatesDimension = require('./DatesDimension').DatesDimension;
var CustomersDimension = require('./StoresDimension').StoresDimension;
var SalesPersonsDimension = require('./SalesPersonsDimension').SalesPersonsDimension;
var SaleTerritoriesDimension = require('./SaleTerritoriesDimension').SaleTerritoriesDimension;
var ShipMethodsDimension = require('./ShipMethodsDimension').ShipMethodsDimension;
var CurrenciesDimension = require('./CurrenciesDimension').CurrenciesDimension;

/*
Sale reason Dimension Model
*/
var SalesOrdersToStoreFact = db.define('sales_orders_to_store_fact', {
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
  storeId: {
    type: Sequelize.INTEGER,
    references: {
      model: StoresDimension,
      key: 'storeId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  salePersonId: {
    type: Sequelize.INTEGER,
    references: {
      model: SalesPersonsDimension,
      key: 'businessEntityID',
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
      key: 'shipMethodId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  taxAmount: Sequelize.DOUBLE,
  freight: Sequelize.DOUBLE,
  totalDue: Sequelize.DOUBLE,
  comment: Sequelize.TEXT
});

module.exports = {
  SalesOrdersToStoreFact: SalesOrdersToStoreFact
};
