import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountryFormComponent } from './country.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { ControlsModule } from '../../../../components/controls/controls.module';

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    CountryFormComponent
  ],
  exports: [
    CountryFormComponent
  ],
  providers: []
} )
export class CountryFormModule {}
