import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollEventDirective } from './scroll.component';

@NgModule ( {
  imports: [
    CommonModule,
  ],
  declarations: [
    ScrollEventDirective
  ],
  exports: [
    ScrollEventDirective
  ],
  providers: []
} )
export class ScrollModule {}