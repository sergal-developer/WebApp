import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';

@NgModule ( {
  imports: [
    CommonModule,
  ],
  declarations: [
    ErrorComponent
  ],
  exports: [
    ErrorComponent
  ],
  providers: []
} )
export class ErrorModule {}
