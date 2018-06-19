import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeviceFormComponent } from './device.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { ControlsModule } from '../../../../components/controls/controls.module';

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ControlsModule
  ],
  declarations: [
    DeviceFormComponent
  ],
  exports: [
    DeviceFormComponent
  ],
  providers: []
} )
export class DeviceFormModule {}
