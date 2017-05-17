var db = require('../config/database');
var sourceDb = require('../config/oltpdatabase');
var Sequelize = require('sequelize');

var helpers = {};

var counter = 0;

helpers.transformSalesReasons = function(reasons) {
  var newReasons = [];
  for (var i = 0; i < reasons.length; i++) {
    var reason = {
      salesReasonId: reasons[i].salesreasonid,
      name: reasons[i].name,
      reasonType: reasons[i].reasontype
    };
    newReasons.push(reason);
  }
  //push null value
  newReasons.push({
    salesReasonId: -1,
    name: "No definido",
    reasonType: "No definido"
  });

  return newReasons;
};

helpers.transformProductCategories = function(categories) {
  var newCategories = [];
  for (var i = 0; i < categories.length; i++) {
    var category = {
      ProductSubcategoryId: categories[i].productsubcategoryid,
      ProductCategoryId: categories[i].productcategoryid,
      categoryName: categories[i].category_name,
      subCategoryName: categories[i].subcategory_name
    };
    newCategories.push(category);
  }
  //push null category
  newCategories.push({
    ProductSubcategoryId: -1,
    ProductCategoryId: -1,
    categoryName: "No definido",
    subCategoryName: "No definido"
  });

  return newCategories;
};

helpers.transformProducts = function(products) {
  var newProducts = [];
  for (var i = 0; i < products.length; i++) {
    var product = {
      ProductId: products[i].productid,
      name: products[i].name,
      makeFlag: products[i].makeflag,
      finishedGoodsFlag: products[i].finishedgoodsflag,
      color: products[i].color,
      standardCost: products[i].standardcost,
      listPrice: products[i].listprice,
      ProductSubcategoryId: products[i].productsubcategoryid
    };
    newProducts.push(product);
  }
  return newProducts;
};

helpers.transformSpecialOffers = function(specialOffers) {
  var newSpecialOffers = [];
  for (var i = 0; i < specialOffers.length; i++) {
    var offer = {
      SpecialOfferID: specialOffers[i].specialofferid,
      description: specialOffers[i].description,
      discountPercent: specialOffers[i].discountpercent,
      type: specialOffers[i].type,
      category: specialOffers[i].category,
      startDate: specialOffers[i].startdate,
      endDate: specialOffers[i].enddate,
      minQuantity: specialOffers[i].minqty,
      maxQuantity: specialOffers[i].maxqty
    };
    newSpecialOffers.push(offer);
  }
  //mirar si hay que agregar null
  return newSpecialOffers;
};

helpers.transformSaleTerritories = function(saleTerritories) {
  var newTerritories = [];
  for (var i = 0; i < saleTerritories.length; i++) {
    var offer = {
      SalesTerritoryId: saleTerritories[i].territoryid,
      name: saleTerritories[i].name,
      countryRegion: saleTerritories[i].countryregion,
      group: saleTerritories[i].group,
      salesYearToDate: saleTerritories[i].salesydt,
      salesLastYear: saleTerritories[i].saleslastyear,
      costYearToDate: saleTerritories[i].costydt,
      costLastyear: saleTerritories[i].costlastyear
    };
    newTerritories.push(offer);
  }
  //mirar si hay que agregar null
  return newTerritories;
};

helpers.transformDates = function(dates) {
  var newDates = [];
  for (var i = 0; i < dates.length; i++) {
    var date = {
      dateName: dates[i].datename,
      dateMin: dates[i].mindate,
      dateMax: dates[i].maxdate
    }

    newDates.push(date);
  }
  //push null date
  newDates.push({
    dateDimensionId: -1,
    dateName: 'No definido',
    dateMin: '1970-01-01 00:00:00.000 +00:00',
    dateMax: '2018-01-01 00:00:00.000 +00:00'
  });

  //hotfix firstdate
  newDates[0].dateMin = '2011-05-01T05:00:00.000Z';

  return newDates;
};

helpers.transformCurrencies = function(currencies) {
  var newCurrencies = [];
  for (var i = 0; i < currencies.length; i++) {
    var currency = {
      currencyId: currencies[i].currencyid,
      currencyCode: currencies[i].currencycode,
      name: currencies[i].name
    }
    newCurrencies.push(currency);
  }

  return newCurrencies;
};

helpers.transformSaleOrderDetails = function(details){
  var me = this,
    newDetails = [];
  for (var i = 0; i < details.length; i++) {
    var detail = {
        SalesOrderDetailId: details[i].salesorderdetailid,
        salesOrderId: details[i].salesorderid,
        carrierTrackingNumber: details[i].carriertrackingnumber,
        orderQuantity: details[i].orderqty,
        productId: details[i].productid,
        specialOfferId: details[i].specialofferid,
        unitPrice: details[i].unitprice,
        unitPriceDiscount: details[i].unitpricediscount,
        lineTotal: details[i].linetotal
    }
    newDetails.push(detail);
  }

  return newDetails;
};

helpers.transformCurrencyRates = function(currencyRates, currenciesRanges,  datesRanges) {
  var me = this,
    newRates = [];
  for (var i = 0; i < currencyRates.length; i++) {
    var currencyRate = {
      dateDimensionId: me.findDateDimensionId(currencyRates[i].currencyratedate, datesRanges),
      currencyRateDate: currencyRates[i].currencyratedate,
      fromCurrencyCode: me.findCurrencyDimensionId(currencyRates[i].fromcurrencycode, currenciesRanges),
      toCurrencyCode: me.findCurrencyDimensionId(currencyRates[i].tocurrencycode, currenciesRanges),
      averrageRate: currencyRates[i].averagerate,
      endOfDayRate: currencyRates[i].endofdayrate
    }
    newRates.push(currencyRate);
  }

  return newRates;
};

helpers.transformCustomers = function(customers) {
  var me = this,
    newCustomers = [];
  for (var i = 0; i < customers.length; i++) {
    var customer = {
      customerId: customers[i].customerid,
      title: customers[i].title,
      firstName: customers[i].firstname,
      middleName: customers[i].middlename,
      lastName: customers[i].lastname
    }
    newCustomers.push(customer);
  }

  return newCustomers;
};

helpers.transformStores = function(stores) {
  var me = this,
    newStores = [];
  for (var i = 0; i < stores.length; i++) {
    var store = {
      customerId: stores[i].customerid,
      name: stores[i].name,
      title: stores[i].title,
      firstName: stores[i].firstname,
      middleName: stores[i].middlename,
      lastName: stores[i].lastname
    }
    newStores.push(store);
  }

  return newStores;
};

helpers.transformShipMethods = function(shipMethods) {
  var me = this,
    newShipMethods = [];
  for (var i = 0; i < shipMethods.length; i++) {
    var shipMethod = {
      shipMethodId: shipMethods[i].shipmethodid,
      name: shipMethods[i].name,
      shipBase: shipMethods[i].shipbase,
      shipRate: shipMethods[i].shiprate
    }

    newShipMethods.push(shipMethod);
  }
  return newShipMethods;
};

helpers.transformSalePersons = function(salesPersons) {
  var me = this,
    newPersons = [];
  for (var i = 0; i < salesPersons.length; i++) {
    var person = {
      businessEntityID: salesPersons[i].businessentityid,
      title: salesPersons[i].title,
      firstName: salesPersons[i].firstname,
      middleName: salesPersons[i].middlename,
      lastName: salesPersons[i].lastname,
      salesQuota: salesPersons[i].salesquota,
      bonus: salesPersons[i].bonus,
      commissionPercent: salesPersons[i].commissionpct,
      salesYearToDate: salesPersons[i].salesytd,
      salesLastYear: salesPersons[i].saleslastyear
    }
    newPersons.push(person);
  }

  return newPersons;
}

helpers.transformSalesOrders = function(salesOrders, DatesDimension) {
  var me = this,
      newOrders = [],
      counterOrders = 0;

  for (var i = 0; i < salesOrders.length; i++) {
    var order = {
      SalesOrderId: salesOrders[i].salesorderid,
      revisionNumber: salesOrders[i].revisionnumber,
      dateDimensionId: me.findDateDimensionId(salesOrders[i].orderdate, DatesDimension),
      orderDate: salesOrders[i].orderdate,
      dueDate: salesOrders[i].duedate,
      shipDate: salesOrders[i].shipdate,
      status: salesOrders[i].status,
      onlineOrderFlag: salesOrders[i].onlineorderflag,
      purchaseOrderNumber: salesOrders[i].purchaseordernumber,
      accountNumber: salesOrders[i].accountnumber,
      customerId: salesOrders[i].customerid,
      salePersonId: salesOrders[i].salepersonid,
      territoryId: salesOrders[i].territoryid,
      shipMethodId: salesOrders[i].shipmethodid,
      taxAmount: salesOrders[i].taxamt,
      freight: salesOrders[i].freight,
      totalDue: salesOrders[i].totaldue,
      comment: salesOrders[i].comment
    }
    if(counterOrders<10){
      console.log(order);
      counterOrders++;
    }
    newOrders.push(order);
  }

  return newOrders;
}

helpers.findDateDimensionId = function(currencyRateDate, datesRanges) {
  var rateDate = new Date(currencyRateDate);
  
  for (var i = 0; i < datesRanges.length; i++) {
    var minDate = new Date(datesRanges[i].dataValues.dateMin),
      maxDate = new Date(datesRanges[i].dataValues.dateMax);
    
    if (rateDate >= minDate && rateDate <= maxDate) {
      return datesRanges[i].dataValues.dateDimensionId;
    }
  }

  return -1;
};

helpers.findCurrencyDimensionId = function(currencyCode, currenciesRanges) {
  for (var i = 0; i < currenciesRanges.length; i++) {
    //verificar estructura
    if (currenciesRanges[i].currencyCode == currencyCode) {
      return currenciesRanges[i].currencyId;
    }
  }
  return -1;

};

module.exports = helpers;
