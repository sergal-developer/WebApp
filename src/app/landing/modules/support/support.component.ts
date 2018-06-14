import { Component, OnInit } from '@angular/core';
// import { Company, Site, Floor, Room, Device, Notification, Country, DeviceType } from '../../../components/models/models';
// import { Globals } from '../../../components/services/globals/globals';
// import { ServerDataService } from '../../../components/services/data/data';
import { Location } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'support',
  templateUrl: './support.html',
  styleUrls: ['./support.scss']
})

export class SupportComponent implements OnInit {

    constructor(
      // private globals: Globals,
      // private data: ServerDataService,
      // private location: Location
    ) { }
    // Properties
    public stackData: Array<string> = [];

    // Functions
    ngOnInit() {
      // this.checkCountries();
      setTimeout(() => {
        // this.checkDeviceTypes();
      }, 2000);
      setTimeout(() => {
        // this.checkRoles();
      }, 3000);
      setTimeout(() => {
        // this.checkUsers();
      }, 5000);
     }

    // checkCompany() {
    //   this.data.companies().then((d: Array<any>) => {
    //     if(!d.length) {
    //       this.installCompany();
    //     }
    //   })
    // }

    // installCompany(next?: any) {
    //   this.getCountries('AR', (d: any) => {
    //     if(d) {
    //       this.data.installCompanyDefault('Globant', d.idcountry)
    //         .then(d => {
    //           this.stackData.push('Company installed.');
    //             if(next) { next(); }
    //           })
    //         .catch(e => console.log(e));
    //     }
    //   });
    // }

    // checkRoles() {
    //   this.data.roles().then((d: Array<any>) => {
    //     if(!d.length) {
    //       this.installRoles();
    //     }
    //   })
    // }

    // installRoles(next?: any) {
    //   this.data.installRolesDefault()
    //     .then(d => {
    //       this.stackData.push('Roles installed.');
    //         if(next) { next(); }
    //       })
    //     .catch(e => console.log(e));
    // }

    // checkDeviceTypes() {
    //   this.data.deviceTypes().then((d: Array<any>) => {
    //     if(!d.length) {
    //       this.installDeviceTypes();
    //     }
    //   })
    // }

    // installDeviceTypes(next?: any) {
    //   this.data.installDeviceTypesDefault()
    //     .then(d => {
    //       this.stackData.push('Device Types installed.');
    //         if(next) { next(); }
    //       })
    //     .catch(e => console.log(e));
    // }

    // getCountries(code: string, next?: any) {
    //   this.data.countries({ code: code }).then((d: Array<any>) => {
    //     if(d.length) {
    //       if(next) { next(d[0]) };
    //     } else {
    //       if(next) { next(null) };
    //     }
    //   })
    // }

    // checkCountries() {
    //   this.data.countries().then((d: Array<any>) => {
    //     if(!d.length) {
    //       this.installCountries((x: any) => {
    //         if(x) {
    //           this.checkCompany();
    //         }
    //       });
    //     } else {
    //       this.checkCompany();
    //     }
    //   })
    // }

    // installCountries(next?: any) {
    //   this.data.installCountriesDefault()
    //     .then(d => {
    //       this.stackData.push('Countries installed.');
    //         if(next) { next(d); }
    //       })
    //     .catch(e => console.log(e));
    // }

    // checkUsers() {
    //   this.data.users().then((d: Array<any>) => {
    //     if(!d.length) {
    //       this.installUsers();
    //     } else {
    //       this.checkCompany();
    //     }
    //   })
    // }

    // installUsers(next?: any) {
    //   this.data.installUserDefault()
    //     .then(d => {
    //         this.stackData.push('User default installed.');
    //         setTimeout(() => {
    //           this.stackData = [];
    //           this.stackData.push('instalation complete');
    //           setTimeout(() => {
    //             this.reloadApp();
    //           }, 2000);
    //         }, 5000);
    //         if(next) { next(d); }
    //       })
    //     .catch(e => console.log(e));
    // }

    // reloadApp() {
    //   this.stackData = [];
    //   this.stackData.push('Reloading site ...');
    //   setTimeout(() => {
    //     window.location.reload(true);
    //   }, 3000);
    // }
}
