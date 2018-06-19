import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../../../../material.module';
import { ControlsModule } from '../../../../components/controls/controls.module';
import { UploadFormComponent } from './upload.component';

@NgModule ( {
  imports: [
    CommonModule,
  ],
  declarations: [
    UploadFormComponent
  ],
  exports: [
    UploadFormComponent
  ],
  providers: []
} )
export class UploadFormModule {}
