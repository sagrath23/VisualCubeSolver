import { Component, OnInit } from '@angular/core';

import { SalesComponent } from '../sales/sales.component';
import { ReportComponent } from '../report/report.component';

import { AuthService } from '../auth/auth.service';


@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [AuthService]
})

export class DashboardComponent implements OnInit {

    private result:any;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {

    }

    executeQuery(query:string):any{
    	var me = this;

    	me.authService.executeQuery(query)
    		.then(data => {
          me.result = data;
    	});
    	console.log(query);
    }  

}