import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeviceTypeFormComponent } from './device-type.component';
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
    DeviceTypeFormComponent
  ],
  exports: [
    DeviceTypeFormComponent
  ],
  providers: []
} )
export class DeviceTypeFormModule {}
