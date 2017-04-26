import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  providers: [AuthService]
})

export class DashboardComponent implements OnInit {

  	constructor(private authService: AuthService) { }

  	ngOnInit(): void {

  	}

}
