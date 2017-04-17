var db = require('../config/database');
var Sequelize = require('sequelize');
var ProductCategoriesDimension = require('./ProductCategoriesDimension').ProductCategoriesDimension;

/*
Special Offers Dimension Model
*/
var ProductsDimension = db.define('products_dimension', {
  ProductId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  makeFlag: Sequelize.BOOLEAN,
  finishedGoodsFlag: Sequelize.BOOLEAN,
  color: Sequelize.STRING,
  standardCost: Sequelize.DOUBLE,
  listPrice: Sequelize.DOUBLE,
  ProductSubcategoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: ProductCategoriesDimension,
      key: 'ProductSubcategoryId',
      deferrable: Sequelize.Deferrable.NOT
   }
 }
});

module.exports = {
  ProductsDimension: ProductsDimension
};
