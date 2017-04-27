import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  providers: [AuthService],
  template: `
    <base-chart
      class="chart"
      [datasets]="datasets"
      [labels]="labels"
      [options]="options"
      [chartType]="'line'">
    </base-chart>
  `
})

export class DashboardComponent implements OnInit {

  	constructor(private authService: AuthService) { }

  	ngOnInit(): void {

  	}

}
