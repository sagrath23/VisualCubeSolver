//Angular 2 Core Components
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//Angular 2 Material WebComponents
import { MaterialModule } from '@angular/material';
//Angular Material Animations
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
//Chartjs module
import { ChartsModule } from 'ng2-charts/ng2-charts';

//App Main Component
import { AppComponent }  from './app.component';

//App Components
import { AuthService }	from './auth/auth.service';
import { DashboardComponent} from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';

//App routes
import { AppRoutingModule }    from './routes/app-routing.module';

@NgModule({
  	imports:[ BrowserModule , FormsModule , HttpModule, AppRoutingModule, MaterialModule, NoopAnimationsModule, ChartsModule],
  	declarations: [ AppComponent, DashboardComponent, SalesComponent],
  	providers: [ AuthService ],
  	bootstrap:    [ AppComponent ]
})

export class AppModule { }
