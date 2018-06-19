import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { ControlsModule } from '../../../components/controls/controls.module';
import { SiteComponent } from './site.component';
import { FormsModelModule } from '../forms/forms.module';

@NgModule ( {
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    ControlsModule,
    FormsModelModule
  ],
  declarations: [
    SiteComponent,
  ],
  exports: [
    SiteComponent
  ],
  providers: []
} )
export class SiteModule {}
