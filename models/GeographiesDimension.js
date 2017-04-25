var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale reason Dimension Model
*/
var GeographiesDimension = db.define('geographies_dimension', {
  //llave foranea a ubicacion geográfica
  stateProvinceId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stateProvinceCode: Sequelize.STRING,
  countryRegionCode: Sequelize.STRING,
  stateProvinceName: Sequelize.STRING,
  countryRegionName: Sequelize.STRING
});

module.exports = {
  GeographiesDimension: GeographiesDimension
};
