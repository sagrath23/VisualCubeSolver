var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Special Offers Dimension Model
*/
var SalesPersonsDimension = db.define('sales_persons_dimension', {
 title: Sequelize.STRING,
 firstName: Sequelize.STRING,
 middleName: Sequelize.STRING,
 lastName: Sequelize.STRING,
 salesQuota: Sequelize.DOUBLE,
 bonus: Sequelize.DOUBLE,
 commissionPercent: Sequelize.DOUBLE,
 salesYearToDate: Sequelize.DOUBLE,
 salesLastYear: Sequelize.DOUBLE
});

module.exports = {
  SalesPersonsDimension: SalesPersonsDimension
};
