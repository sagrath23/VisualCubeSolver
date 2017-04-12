var db = require('../config/database');
var Sequelize = require('sequelize');

/*
PersonTypes Dimension Model
*/
var PersonTypesDim = require('./PersonTypesDim').PersonTypesDim;

//sync model
db.sync({
  force: true
}).then(function() {

  return true;
});

module.exports = {
  PersonTypesDim: PersonTypesDim
};
