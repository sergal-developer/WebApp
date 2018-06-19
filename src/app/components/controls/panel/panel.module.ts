import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { MaterialModule } from '../../../material.module';
import { FormsModelModule } from '../../../application/views/forms/forms.module';

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    PanelComponent
  ],
  exports: [
    PanelComponent
  ],
  providers: []  
} )
export class PanelModule {}