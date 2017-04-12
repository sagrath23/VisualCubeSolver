var db = require('../config/database');
var Sequelize = require('sequelize');
var LocationsDim = require('./LocationsDimension').LocationsDim;

/*
Persons Dimension Model
*/
var SaleTerritoriesDim = db.define('sale_territories_dimension', {
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
  SaleTerritoriesDim: SaleTerritoriesDim
};
