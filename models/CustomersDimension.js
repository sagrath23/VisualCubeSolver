var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Special Offers Dimension Model
*/
var CustomersDimension = db.define('customers_dimension', {
 title: Sequelize.STRING,
 firstName: Sequelize.STRING,
 middleName: Sequelize.STRING,
 lastName: Sequelize.STRING,
 customerType: Sequelize.BOOLEAN
});

module.exports = {
  CustomersDimension: CustomersDimension
};
