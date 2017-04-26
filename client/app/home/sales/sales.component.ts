import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'sales-report',
  templateUrl: 'sales.component.html',
  providers: [AuthService]
})

export class SalesComponent implements OnInit {

  	constructor(private authService: AuthService) { }

  	ngOnInit(): void {

  	}

}
