var db = require('../config/database');
var Sequelize = require('sequelize');
var LocationsDim = require('./LocationsDimension').LocationsDim;

/*
Persons Dimension Model
*/
var CustomersDim = db.define('customers_dimension', {
  //llave foranea a ubicacion geográfica
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  middleName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  locationId: {
    type: Sequelize.INTEGER,
    references: {
      model: LocationsDim,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

module.exports = {
  CustomersDim: CustomersDim
};
