var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Sale territories Dimension Model
*/
var ShipMethodsDimension = db.define('ship_methods_dimension', {
	shipMethodId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	shipBase: Sequelize.DOUBLE,
	shipRate: Sequelize.DOUBLE
});

module.exports = {
	ShipMethodsDimension: ShipMethodsDimension
};