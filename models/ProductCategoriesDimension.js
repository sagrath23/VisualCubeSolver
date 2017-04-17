var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Special Offers Dimension Model
*/
var ProductCategoriesDimension = db.define('product_categories_dimension', {
  ProductSubcategoryId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ProductCategoryId: Sequelize.INTEGER,
  categoryName: Sequelize.STRING,
  subCategoryName: Sequelize.STRING
});

module.exports = {
  ProductCategoriesDimension: ProductCategoriesDimension
};
