var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Persons Dimension Model
*/
var AccountsDim = db.define('accounts_dimension', {
  //llave foranea a ubicacion geográfica
  accountDescription: {
    type: Sequelize.STRING,
    allowNull: false
  },
  accountParentId: {
    type: Sequelize.INTEGER,
    references: {
      model: AccountsDim,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  accountType: Sequelize.STRING,

});

module.exports = {
  AccountsDim: AccountsDim
};
