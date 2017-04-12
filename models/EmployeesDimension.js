var db = require('../config/database');
var Sequelize = require('sequelize');
var SaleTerritoriesDim = require('./SaleTerritoriesDimension').SaleTerritoriesDim;

/*
Persons Dimension Model
*/
var EmployeesDim = db.define('employees_dimension', {
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
  saleTerritoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: SaleTerritoriesDim,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

module.exports = {
  EmployeesDim: EmployeesDim
};
