//Angular 2 Core Components
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//App Main Component
import { AppComponent }  from './app.component';

//App Components
import { AuthService }			from './auth/auth.service';

//App routes
import { AppRoutingModule }    from './routes/app-routing.module';

@NgModule({
  	imports:[ BrowserModule , FormsModule , HttpModule, AppRoutingModule],  
  	declarations: [ AppComponent ],
  	providers: [ AuthService ],
  	bootstrap:    [ AppComponent ]
})

export class AppModule { }
