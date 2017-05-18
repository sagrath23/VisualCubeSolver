import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'report-component',
  templateUrl: 'report.component.html',
  styleUrls: ['report.component.css'],
  providers: [AuthService]
})

export class ReportComponent implements OnInit {

  private reportData:any;

  // Pie
  public pieChartLabels:string[];
  public pieChartData:number[];
  public pieChartOptions: any = {
    responsive:true
  };
  public pieChartType:string = 'line';
  public isDataAvailable:boolean = false;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    var me = this;

      me.getSales();
  }

  getSales():void{
  	var me = this;
  		
  	me.authService.getSalesPerMonth()
      .then(data => {
        console.log(data,"report data");

        me.pieChartLabels = data.labels; 
        me.pieChartData = data.datasets;
        me.isDataAvailable = true;
        me.reportData = data;
      });
  	}

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  	 
}
