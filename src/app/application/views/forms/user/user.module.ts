import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../../../../material.module';
import { ControlsModule } from '../../../../components/controls/controls.module';
import { UserFormComponent } from './user.component';

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    UserFormComponent
  ],
  exports: [
    UserFormComponent
  ],
  providers: []
} )
export class UserFormModule {}
