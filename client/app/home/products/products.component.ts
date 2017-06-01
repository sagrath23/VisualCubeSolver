import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'products-component',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css'],
  providers: [AuthService]
})

export class ProductsComponent implements OnInit {

  private reportData: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


  public isDataAvailable: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    var me = this;
    me.isDataAvailable = true;
    //me.getSales();
  }

  getSales(): void {
    var me = this;

    me.authService.getSalesPerMonth()
      .then(data => {
        console.log(data, "report data");

        me.isDataAvailable = true;
      });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
