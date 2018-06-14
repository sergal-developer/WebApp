import { RouterModule, Routes } from '@angular/router';

// import { AuthGuardService } from '../_common/authentication/auth.guard.service';
import { LandingComponent } from './landing.component';
import { AboutComponent } from './modules/about/about.component';
import { SupportComponent } from './modules/support/support.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';

const landingRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    // canActivate: [ AuthGuardService ],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent }
    ]
  }
];

export const LandingRoutes = RouterModule.forChild ( landingRoutes );
