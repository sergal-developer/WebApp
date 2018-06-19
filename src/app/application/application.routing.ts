import { RouterModule, Routes } from '@angular/router';

// import { AuthGuardService } from '../_common/authentication/auth.guard.service';
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SiteComponent } from './views/site/site.component';
import { RoomComponent } from './views/room/room.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ErrorComponent } from './views/error/error.component';
import { ReportsComponent } from './views/reports/reports.component';
import { NotificationsComponent } from './views/notifications/notifications.component';

const applicationRoutes: Routes = [
  {
    path: 'app',
    component: ApplicationComponent,
    // canActivate: [ AuthGuardService ],
    children: [
      { path: '', component: DashboardComponent, data: { animation: 'tiger' }},
      { path: 'site/:site', component: SiteComponent, data: { animation: 'site' } },
      { path: 'site/:site/room/:id', component: RoomComponent, data: { animation: 'room' } },
      { path: 'settings', component: SettingsComponent, data: { animation: 'settings' } },
      { path: 'reports', component: ReportsComponent, data: { animation: 'reports' } },
      { path: 'notifications', component: NotificationsComponent, data: { animation: 'notifications' } },
      { path: '**', component: ErrorComponent, data: { animation: 'error' } }
    ]
  }
];

export const ApplicationRoutes = RouterModule.forChild ( applicationRoutes );
