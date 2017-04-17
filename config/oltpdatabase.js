var Sequelize = require('sequelize');

//OLTP Database
var oltpSequelize = new Sequelize("d1fca6pji0tks9", "rhumdqtingneyy", "c8b9703313b9775d5eaac3c128ec8709e0c0abb2b9a329e331884e219aa4fd31", {
  host: "ec2-54-235-119-27.compute-1.amazonaws.com",
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

module.exports = oltpSequelize;
