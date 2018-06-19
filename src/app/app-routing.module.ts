import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LandingComponent } from './landing/landing.component';
import { ApplicationComponent } from './application/application.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'app', component: ApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
