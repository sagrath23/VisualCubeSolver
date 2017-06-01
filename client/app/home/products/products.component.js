"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_service_1 = require("../auth/auth.service");
var ProductsComponent = (function () {
    function ProductsComponent(authService) {
        this.authService = authService;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        this.isDataAvailable = false;
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var me = this;
        me.isDataAvailable = true;
        //me.getSales();
    };
    ProductsComponent.prototype.getSales = function () {
        var me = this;
        me.authService.getSalesPerMonth()
            .then(function (data) {
            console.log(data, "report data");
            me.isDataAvailable = true;
        });
    };
    // events
    ProductsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ProductsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return ProductsComponent;
}());
ProductsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'products-component',
        templateUrl: 'products.component.html',
        styleUrls: ['products.component.css'],
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ProductsComponent);
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map