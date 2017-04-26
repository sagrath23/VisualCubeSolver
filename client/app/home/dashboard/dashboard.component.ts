import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  directives: [CHART_DIRECTIVES],
  styles: [`
    .chart {
      display: block;
    }
  `],
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

  	private datasets = [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3]
    }
  ];

  private labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  private options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

}
