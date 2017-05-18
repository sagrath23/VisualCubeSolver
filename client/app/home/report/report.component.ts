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

  // lineChart
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public lineChartType:string = 'line';

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

        me.lineChartLabels = data.labels; 
        me.lineChartData = data.datasets;
        me.isDataAvailable = true;
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
