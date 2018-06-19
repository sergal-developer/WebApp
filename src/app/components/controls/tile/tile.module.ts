import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DeviceItemModule } from '../device-item/device-item.module';

@NgModule ( {
  imports: [
    CommonModule,
    NgxChartsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    RouterModule,
    DeviceItemModule
  ],
  declarations: [
    TileComponent
  ],
  exports: [
    TileComponent
  ],
  providers: []
} )
export class TileModule {}