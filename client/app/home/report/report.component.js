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
var ReportComponent = (function () {
    function ReportComponent(authService) {
        this.authService = authService;
        this.pieChartOptions = {
            responsive: true
        };
        this.pieChartType = 'line';
        this.isDataAvailable = false;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var me = this;
        me.getSales();
    };
    ReportComponent.prototype.getSales = function () {
        var me = this;
        me.authService.getSalesPerMonth()
            .then(function (data) {
            console.log(data, "report data");
            me.pieChartLabels = data.labels;
            me.pieChartData = data.datasets;
            me.isDataAvailable = true;
            me.reportData = data;
        });
    };
    // events
    ReportComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ReportComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return ReportComponent;
}());
ReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'report-component',
        templateUrl: 'report.component.html',
        styleUrls: ['report.component.css'],
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ReportComponent);
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map