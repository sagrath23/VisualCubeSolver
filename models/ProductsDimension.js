var db = require('../config/database');
var Sequelize = require('sequelize');
var ProductCategoriesDimension = require('./ProductCategoriesDimension').ProductCategoriesDimension;

/*
Special Offers Dimension Model
*/
var ProductsDimension = db.define('products_dimension', {
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
 name: Sequelize.STRING,
 makeFlag: Sequelize.BOOLEAN,
 finishedGoodsFlag: Sequelize.BOOLEAN,
 color: Sequelize.STRING,
 standardCost: Sequelize.DOUBLE,
 listPrice: Sequelize.DOUBLE,
 productCategory: {
   type: Sequelize.INTEGER,
   references: {
     model: ProductCategoriesDimension,
     key: 'id',
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 }
});

module.exports = {
  ProductsDimension: ProductsDimension
};
