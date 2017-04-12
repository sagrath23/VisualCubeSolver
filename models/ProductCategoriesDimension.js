var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Persons Dimension Model
*/
var ProductCategoriesDim = db.define('product_categories_dimension', {
  //llave foranea a ubicacion geográfica
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = {
  ProductCategoriesDim: ProductCategoriesDim
};
