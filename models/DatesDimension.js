var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale reason Dimension Model
*/
var DatesDimension = db.define('dates_dimension', {
  //llave foranea a ubicacion geográfica
  dateDimensionId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dateName: Sequelize.STRING,
  dateMin: Sequelize.DATE,
  dateMax: Sequelize.DATE
});

module.exports = {
  DatesDimension: DatesDimension
};
