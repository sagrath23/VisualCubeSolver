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

  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    var me = this;

      me.getSales();
  }

  getSales():void{
  	var me = this;
  		
  	me.authService.getSalesPerMonth()
      .then(data => {
        console.log(data);
    	  console.log('data loaded...');
      });
  	}	 
}
