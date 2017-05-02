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

  	constructor(private authService: AuthService) { }

  	ngOnInit(): void {

  	}

  	// Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
