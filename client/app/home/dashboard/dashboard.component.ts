import { Component, OnInit } from '@angular/core';

import { SalesComponent } from '../sales/sales.component';
import { ReportComponent } from '../report/report.component';


@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }  

}