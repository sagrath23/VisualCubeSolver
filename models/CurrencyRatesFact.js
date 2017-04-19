var db = require('../config/database');
var Sequelize = require('sequelize');

var DatesDimension = require('./DatesDimension').DatesDimension;
var CurrenciesDimension = require('./CurrenciesDimension').CurrenciesDimension;

/*
Sale territories Dimension Model
*/
var CurrencyRatesFact = db.define('currency_rates_fact', {
  //llave foranea a ubicacion geográfica
  dateDimensionId: {
    type: Sequelize.INTEGER,
    references: {
      model: DatesDimension,
      key: 'dateDimensionId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  currencyRateDate: Sequelize.DATE,
  fromCurrencyCode: {
    type: Sequelize.INTEGER,
    references: {
      model: CurrenciesDimension,
      key: 'currencyId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  toCurrencyCode: {
    type: Sequelize.INTEGER,
    references: {
      model: CurrenciesDimension,
      key: 'currencyId',
      deferrable: Sequelize.Deferrable.NOT
    }
  },
  averrageRate: Sequelize.DOUBLE,
  endOfDayRate: Sequelize.DOUBLE
});

module.exports = {
  CurrencyRatesFact: CurrencyRatesFact
};
