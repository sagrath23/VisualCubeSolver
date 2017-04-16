var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Special Offers Dimension Model
*/
var SalesPersonsDimension = db.define('sales_persons_dimension', {
  //llave foranea a ubicacion geográfica
  // It is possible to create foreign keys:
 /*bar_id: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Bar,

     // This is the column name of the referenced model
     key: 'id',

     // This declares when to check the foreign key constraint. PostgreSQL only.
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 },*/
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
