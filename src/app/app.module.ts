import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LandingModule } from './landing/landing.module';
import { ApplicationModule } from './application/application.module';

import { Configuration } from './components/services/globals/config';
import { DataService } from './components/services/services.data';
import { HttpHelper } from './components/services/http/http';
import { ServerDataService } from './components/services/data/data';
import { AuthData } from './components/services/security/auth.data';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxChartsModule,

    LandingModule,
    ApplicationModule
  ],
  providers: [ Configuration, DataService, HttpHelper, ServerDataService, AuthData ],
  bootstrap: [AppComponent]
})
export class AppModule { }
