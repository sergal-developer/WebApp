import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomFormComponent } from './room.component';
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
    RoomFormComponent
  ],
  exports: [
    RoomFormComponent
  ],
  providers: []
} )
export class RoomFormModule {}
