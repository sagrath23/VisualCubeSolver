var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale reason Dimension Model
*/
var SalesOrderFact = db.define('sales_orders_fact', {
  //llave foranea a ubicacion geográfica
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reasonType: Sequelize.STRING
});

module.exports = {
  SalesOrderFact: SalesOrderFact
};
