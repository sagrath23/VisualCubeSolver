var db = require('../config/database');
var Sequelize = require('sequelize');

/*
Special Offers Dimension Model
*/
var StoresDimension = db.define('stores_dimension', {
  storeId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  title: Sequelize.STRING,
  firstName: Sequelize.STRING,
  middleName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

module.exports = {
  StoresDimension: StoresDimension
};
