var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Special Offers Dimension Model
*/
var SpecialOffersDimension = db.define('special_offers_dimension', {
  //llave foranea a ubicacion geográfica
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  discountPercent: {
    type: Sequelize.DOUBLE
  },
  type: Sequelize.STRING,
  category: Sequelize.STRING,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  minQuantity: Sequelize.INTEGER,
  maxQuantity: Sequelize.INTEGER
});

module.exports = {
  SpecialOffersDimension: SpecialOffersDimension
};
