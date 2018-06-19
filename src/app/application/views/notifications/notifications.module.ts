import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { ControlsModule } from '../../../components/controls/controls.module';
import { NotificationsComponent } from './notifications.component';

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    ControlsModule
  ],
  declarations: [
    NotificationsComponent
  ],
  exports: [
    NotificationsComponent
  ],
  providers: []
} )
export class NotificationsModule {}
