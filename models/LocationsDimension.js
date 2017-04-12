var db = require('../config/database');
var Sequelize = require('sequelize');
var SaleTerritoriesDim = require('./SaleTerritoriesDimension').SaleTerritoriesDim;
/*
Persons Dimension Model
*/
var LocationsDim = db.define('locations_dimension', {
  //llave foranea a ubicacion geográfica
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  saleTerritoryRegion: {
    type: Sequelize.STRING
  },
  saleTerritoryCountry: {
    type: Sequelize.STRING
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
  LocationsDim: LocationsDim
};
