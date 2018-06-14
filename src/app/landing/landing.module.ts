import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
import { LandingRoutes } from './landing.routing';
import { AboutModule } from './modules/about/about.module';
import { SupportModule } from './modules/support/support.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
// import { DataService } from '../components/services/data/data';
// import { HttpService } from '../components/services/http/http';

@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    LandingRoutes,
    AboutModule,
    SupportModule,
    HomeModule,
    LoginModule
    // ControlsModule
  ],
  declarations: [ LandingComponent ],
  exports: [ RouterModule ],
})
export class LandingModule { }
