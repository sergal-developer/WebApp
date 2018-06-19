import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { FloorFormComponent } from './floor.component';
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
    FloorFormComponent
  ],
  exports: [
    FloorFormComponent
  ],
  providers: []
} )
export class FloorFormModule {}
