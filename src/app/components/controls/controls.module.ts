import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from './avatar/avatar.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { CardModule } from './card/card.module';
import { ChartModule } from './chart/chart.module';
import { DeviceItemModule } from './device-item/device-item.module';
import { PanelModule } from './panel/panel.module';
import { ScrollModule } from './scroll/scroll.module';
import { SvgItemModule } from './svg-item/svg-item.module';
import { TableModule } from './table/table.module';
import { TileModule } from './tile/tile.module';

@NgModule ( {
  imports: [
    CommonModule,
    // Controls
    AvatarModule,
    BreadcrumbModule, 
    CardModule, 
    ChartModule, 
    DeviceItemModule,
    PanelModule, 
    ScrollModule, 
    SvgItemModule, 
    TableModule, 
    TileModule
  ],
  declarations: [],
  exports: [
    AvatarModule,
    BreadcrumbModule, 
    CardModule, 
    ChartModule,
    DeviceItemModule,
    PanelModule, 
    ScrollModule, 
    SvgItemModule, 
    TableModule, 
    TileModule
  ],
  providers: []
} )
export class ControlsModule {}