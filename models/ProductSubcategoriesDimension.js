var db = require('../config/database');
var Sequelize = require('sequelize');
var ProductCategoriesDim = require('./ProductCategoriesDimension').ProductCategoriesDim;

/*
Persons Dimension Model
*/
var ProductSubcategoriesDim = db.define('product_subcategories_dimension', {
  //llave foranea a ubicacion geográfica
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productCategoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: ProductCategoriesDim,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }

});

module.exports = {
  ProductSubcategoriesDim: ProductSubcategoriesDim
};
