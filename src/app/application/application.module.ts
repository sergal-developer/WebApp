import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApplicationComponent } from './application.component';
import { ApplicationRoutes } from './application.routing';

import { DashboardModule } from './views/dashboard/dashboard.module';
import { SiteModule } from './views/site/site.module';
import { RoomModule } from './views/room/room.module';
import { SettingsModule } from './views/settings/settings.module';
import { ErrorModule } from './views/error/error.module';
import { ReportsModule } from './views/reports/reports.module';
import { ControlsModule } from '../components/controls/controls.module';
import { Globals } from '../components/services/globals/globals';
import { WINDOW_PROVIDERS } from '../components/services/window/window';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CookieModule } from 'ngx-cookie';
import { FormsModelModule } from './views/forms/forms.module';
import { NotificationsModule } from './views/notifications/notifications.module';
import { ServerDataService } from '../components/services/data/data';

@NgModule ({
  imports: [ CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    ApplicationRoutes,
    DashboardModule,
    SiteModule,
    RoomModule,
    SettingsModule,
    ErrorModule,
    ReportsModule,
    ControlsModule,
    NgxChartsModule,
    CookieModule,
    FormsModelModule,
    NotificationsModule
  ],
  declarations: [ ApplicationComponent ],
  exports: [ RouterModule ],
  providers: [ Globals, WINDOW_PROVIDERS, ServerDataService ]
})
export class ApplicationModule { }
