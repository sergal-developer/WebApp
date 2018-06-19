import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceItemComponent } from './device-item.component';

@NgModule ( {
  imports: [
    CommonModule,
  ],
  declarations: [
    DeviceItemComponent
  ],
  exports: [
    DeviceItemComponent
  ],
  providers: []
} )
export class DeviceItemModule {}