import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyFormModule } from './company/company.module';
import { CountryFormModule } from './country/country.module';
import { DeviceFormModule } from './device/device.module';
import { DeviceTypeFormModule } from './device-type/device-type.module';
import { FloorFormModule } from './floor/floor.module';
import { RoomFormModule } from './room/room.module';
import { SiteFormModule } from './site/site.module';
import { UploadFormModule } from './upload/upload.module';
import { UserFormModule } from './user/user.module';

@NgModule ( {
  imports: [
    CommonModule,
    CompanyFormModule,
    CountryFormModule,
    DeviceFormModule,
    DeviceTypeFormModule,
    FloorFormModule,
    RoomFormModule,
    SiteFormModule,
    UploadFormModule,
    UserFormModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    CompanyFormModule,
    CountryFormModule,
    DeviceFormModule,
    DeviceTypeFormModule,
    FloorFormModule,
    RoomFormModule,
    SiteFormModule,
    UploadFormModule,
    UserFormModule
  ],
  providers: []
} )
export class FormsModelModule {}