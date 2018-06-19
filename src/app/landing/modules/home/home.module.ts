import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginModule } from '../login/login.module';

@NgModule ( {
  imports: [
    CommonModule,
    LoginModule
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
