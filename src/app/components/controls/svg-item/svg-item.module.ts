import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgItemComponent } from './svg-item.component';

@NgModule ( {
  imports: [
    CommonModule,
  ],
  declarations: [
    SvgItemComponent
  ],
  exports: [
    SvgItemComponent
  ],
  providers: []
} )
export class SvgItemModule {}