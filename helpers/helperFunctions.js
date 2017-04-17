var db = require('../config/database');
var sourceDb = require('../config/oltpdatabase');
var Sequelize = require('sequelize');

var helpers = {};

helpers.transformSalesReasons = function(reasons){
  var newReasons = [];
  for(var i=0; i < reasons.length; i++){
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

helpers.transformProductCategories = function(categories){
  var newCategories = [];
  for(var i=0; i < categories.length; i++){
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

helpers.transformProducts = function(products){
  var newProducts = [];
  for(var i=0; i < products.length; i++){
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

helpers.transformSpecialOffers = function(specialOffers){
  var newSpecialOffers = [];
  for(var i=0; i < specialOffers.length; i++){
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

helpers.transformSaleTerritories = function(saleTerritories){
  var newTerritories = [];
  for(var i=0; i < saleTerritories.length; i++){
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
// //Function that checks if the request is authenticated or not.
// helpers.isAuthenticated = function(req, res, next) {
//
//   if (!req.query.sessionId) {
//     res.status(401);
//     res.send({
//       status: 'error',
//       error: 'Not Authorized.'
//     });
//   } else {
//     var user = Users.getBySessionId(req.query.sessionId);
//     user.then(function(dbuser) {
//       if (dbuser) {
//         next();
//       } else {
//         res.status(401);
//         res.send({
//           status: 'error',
//           error: 'Not Authorized.'
//         });
//       }
//     });
//
//   }
// }
//
// //Function to populate data in DB if DB is empty.
// helpers.populateDb = function() {
//   var promise = Users.get();
//   promise.then(function(data) {
//     if (data.length) {
//       console.log('Users table already populated.');
//     } else {
//       console.log('Populating users table.');
//       Users.seed();
//     }
//   });
//
//   var promise2 = Videos.get();
//   promise2.then(function(data) {
//
//     if (data.length) {
//       console.log('videos table already populated.');
//     } else {
//       console.log('Populating videos table.');
//       Videos.seed();
//     }
//   });
// }
//
module.exports = helpers;
