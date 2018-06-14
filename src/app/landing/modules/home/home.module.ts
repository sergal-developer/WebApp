import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginModule } from '../login/login.module';
import { MaterialModule } from '../../../../angular.material';

@NgModule ( {
  imports: [
    CommonModule,
    LoginModule,
    MaterialModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: []
} )
export class HomeModule {}
