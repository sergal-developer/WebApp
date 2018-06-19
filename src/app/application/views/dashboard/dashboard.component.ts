import { Component, OnInit } from '@angular/core';
import { ServerDataService } from '../../../components/services/data/data';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Company, Site, Floor, Room, Device, Country, DeviceType, Role } from '../../../components/models/models';
import { Globals } from '../../../components/services/globals/globals';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query('div', style({ transform: 'translateX(10%)', opacity: 0})),
        query('div',
          stagger('50ms', [
            animate('200ms', style({ transform: 'translateX(0)', opacity: 1}))
        ]))
      ])
    ])
  ]
})

export class DashboardComponent implements OnInit {

  // Properties
  public titleMenu: string;
  public company: any;
  public sites: Array<Site>;
  private dataLoading = false;

  constructor(private data: ServerDataService,
              private globals: Globals,
              private _router: Router) {

    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          this.globals.title = 'Home';
        }
    });
  }

    // Functions
    ngOnInit() {
      this.loadGlobals();
    }

    onBeforeActiveTile(event: any) {
      this.sites.forEach(s => {
        if (s['xid'] === event) {
          s['selected'] = true;
        } else {
          s['selected'] = false;
        }
      });
    }

    onBeforeInactiveTile($event: any) {
      this.sites.forEach(s => {
          s['selected'] = null;
      });
    }

    loadGlobals() {
      this.dataLoading = false;
      this.getCompanies((company: Company) => {
        this.getCountries((countries: Array<Country>) => {
          this.getRoles((roles: Array<Role>) => {
            this.getDeviceTypes((deviceTypes: Array<DeviceType>) => {
              this.getSites((sites: Array<Site>) => {
                this.sites = sites.map((item: Site) => {
                  item['xid'] = `xsite${item.idsite}`;
                  item['selected'] = null;
                  return item;
                });
                // this.sites[0]['selected'] = this.sites.length === 1 ? true : null;
                this.dataLoading = true;
              });
            });
          });
        });
      });
    }

    // #region Data Sources

    getCompanies(next?: any) {
        this.data.companies({name: 'Globant'})
          .then((d: Array<Company>) => {
            if (d.length) {
              this.globals.currentCompany = d[0];
              if (next) { next(d[0]); }
            } else {
              if (next) { next([]); }
            }
          })
          .catch(e => { console.log(e); if (next) { next(null); } });
    }

    getCountries(next?: any) {
        this.data.countries()
        .then((d: Array<Country>) => {
          if (d.length) {
            this.globals.countries = d;
            if (next) { next(d); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); }});
    }

    getSites(next?: any) {
      // tslint:disable-next-line:no-shadowed-variable
      const query: any = { idcompany: this.globals.currentCompany.idcompany };
      const sites = this.globals.currentUser.userInformation.sitesView;
      this.data.sites(query)
        .then((d: Array<Site>) => {
          if (d.length) {
            d = d.filter((s: Site) => {
              if (sites.length) {
                if (sites.indexOf(s.idsite) !== -1) {
                  return d;
                }
              } else {
                return d;
              }
            });
            d = d.map((s: Site) => {
              const country = this.globals.countries.filter(c => {
                return c.idcountry === s.idcountry;
              })[0];
              s.countryName = country.name;
              return s;
            });
            if (next) { next(d); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => {
          console.log(e);
          if (next) { next(null); }
        });
    }

    getRoles(next?: any) {
      this.data.roles()
        .then((d: Array<Role>) => {
          if (d.length) {
            this.globals.roles = d;
            if (next) { next(d); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }

    getDeviceTypes(next?: any) {
      this.data.deviceTypes()
        .then((d: Array<DeviceType>) => {
          if (d.length) {
            this.globals.deviceTypes = d;
            if (next) { next(d); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }

    // #endregion

    // loadCompany() {
    //   this._dataService.getAll('/companies?name=Globant').subscribe((companies: Array<Company>) => {
    //     this.company = companies[0];
    //     if (!companies[0]) {
    //       console.error("The company no exist");
    //       return;
    //     }
    //     this._dataService.getAll(`/sites?idcompany=${ this.company.idcompany }`).subscribe((sites: Array<Site>) => {
    //       this.sites = sites.map((item: Site) => {
    //         item['xid'] = `xsite${item.idsite}`;
    //         item['selected'] = null;
    //         return item;
    //       });
    //       // this.sites.forEach((site: Site) => {
    //       //   this._dataService.getAll(`/floors?idsite=${ site.idsite }`).subscribe((floors: Array<Floor>) => {
    //       //     site.floors = floors;
    //       //     site.floors.forEach((floor: Floor) => {
    //       //       this._dataService.getAll(`/rooms?idfloor=${ floor.idfloor }`).subscribe((rooms: Array<Room>) => {
    //       //         floor.rooms = rooms;
    //       //         floor.rooms.forEach((room: Room) => {
    //       //           this._dataService.getAll(`/devices?idroom=${ room.idroom }`).subscribe((devices: Array<Device>) => {
    //       //             room.devices = devices;
    //       //             console.log('room.devices: ', room.devices);
    //       //             console.log('this.sites: ', this.sites);
    //       //             // site.typeDevices = room.devices.map((t: Device) => { return t.type; })
    //       //             //                   .filter((item, pos, self) => {
    //       //             //                     return self.indexOf(item) == pos;
    //       //             //                   });
    //       //           });
    //       //         });
    //       //       });
    //       //     });
    //       //   });
    //       //   this._dataService.getAll(`/countries?idcountry=${ site.idcountry }`).subscribe((country: Array<Country>) => {
    //       //     site.countryName = country[0].name;
    //       //   });
    //       // });
    //     });
    //   });

    //   // this._dataService.getAll('/device-types').subscribe((dt: Array<DeviceType>)=>  {
    //   //   this.globals.deviceTypes = dt;
    //   // });
    // }
}
