import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyFormComponent } from './company.component';
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
    CompanyFormComponent
  ],
  exports: [
    CompanyFormComponent
  ],
  providers: []
} )
export class CompanyFormModule {}
