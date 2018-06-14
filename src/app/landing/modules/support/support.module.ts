import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupportComponent } from './support.component';

@NgModule ( {
  imports: [
    CommonModule,
  ],
  declarations: [
    SupportComponent
  ],
  exports: [
    SupportComponent
  ],
  providers: []
} )
export class SupportModule {}