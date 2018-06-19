import { Injectable } from '@angular/core';
import { User, Role, UserInformation, Country, DeviceType, Company } from '../../models/models';

@Injectable()
export class Globals {
  title: String = '';
  readonly pathMaps: string = '/app/resources/maps/';
  readonly server = {
    devicesStored: {
      ip: '10.28.148.221',
      port: 1883
    }
  };
  readonly intervalReadData = 2000;
  currentUser: User;
  currentRole: Role;
  roles: Array<Role>;
  countries: Array<Country>;
  deviceTypes: Array<DeviceType>;
  currentCompany: Company;
  breadcrumb: Array<any>;
  test: String = 'some';
}
