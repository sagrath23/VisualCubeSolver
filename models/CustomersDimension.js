var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Special Offers Dimension Model
*/
var CustomersDimension = db.define('customers_dimension', {
  customerId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  firstName: Sequelize.STRING,
  middleName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  accountNumber: Sequelize.STRING
});

module.exports = {
  CustomersDimension: CustomersDimension
};
