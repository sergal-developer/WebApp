import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../../../angular.material';
// import { MaterialModule } from '../../../material.module';
// import { CookieModule } from 'ngx-cookie';

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
    // CookieModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: []
} )
export class LoginModule {}
