import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'sales-report',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css'],
  providers: [AuthService]
})

export class SalesComponent implements OnInit {

  // Pie
  public pieChartLabels:string[];
  public pieChartData:number[];
  public pieChartType:string = 'pie';

  	constructor(private authService: AuthService) { }

  	ngOnInit(): void {
      var me = this;

      me.authService.getSalesPerClientType()
      .then(data => {
        me.pieChartLabels = data["labels"]; 
        me.pieChartData = data["data"]});

  	}

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
