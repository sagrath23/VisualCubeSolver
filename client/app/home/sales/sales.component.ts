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
  public pieChartOptions: any = {
  	responsive:true
  };
  public pieChartType:string = 'pie';
  public isDataAvailable:boolean = false;

  	constructor(private authService: AuthService) { }

  	ngOnInit(): void {
      var me = this;

      me.getSales();
  	}

  	getSales():void{
  		var me = this;
  		
  		me.authService.getSalesPerClientType()
      .then(data => {
        me.pieChartLabels = data["labels"]; 
        me.pieChartData = data["data"];
    	me.isDataAvailable = true;
    	console.log('data loaded...');
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
