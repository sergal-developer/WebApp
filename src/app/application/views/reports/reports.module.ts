import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports.component';

@NgModule ( {
  imports: [
    CommonModule,
  ],
  declarations: [
    ReportsComponent
  ],
  exports: [
    ReportsComponent
  ],
  providers: []
} )
export class ReportsModule {}
