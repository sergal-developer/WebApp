import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Company, Site, Floor, Room, Device, Country, DeviceType, File, User, Role } from '../../../components/models/models';
import { Globals } from '../../../components/services/globals/globals';
import { ServerDataService } from '../../../components/services/data/data';
import { AuthData } from '../../../components/services/security/auth.data';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})

export class SettingsComponent implements OnInit {
  // Properties
  private displayedColumns = ['idsite', 'key', 'name', 'countryName'];
  private displayedColumnsUsers = ['iduser', 'username', 'email'];
  private displayedColumnsDeviceTypes = ['iddevicetype', 'type', 'prefix', 'color'];
  private displayedColumnsCountry = ['idcountry', 'name', 'code'];

  private dummyDataLog: Array<String> = [];
  private panelOpenState: Boolean = false;

  private sitePanelOpen: Boolean = false;
  private userPanelOpen: Boolean = false;
  private errorsField: Array<string> = [];

  // Models
  private sitesCollection: Array<Site>;
  private siteModel: Site = new Site();

  private usersCollection: Array<User>;
  private userModel: User = new User();

  private deviceTypesCollection: Array<DeviceType>;
  private deviceTypeModel: DeviceType = new DeviceType();

  private rolesCollection: Array<Role>;
  private roleModel: Role = new Role();

  private countryCollection: Array<Country>;
  private countryModel: Country = new Country();

  private companyCollection: Array<Company>;

  public dataLoading = false;
  public panelControl = {
    show: false,
    title: 'New User',
    subtitle: '',
    type: 'panel-float right',
    size: 'small'
  };

  public showFormSite: Boolean = false;
  public showFormUser: Boolean = false;
  public showFormDeviceType: Boolean = false;
  public showFormCountry: Boolean = false;

  constructor(private authData: AuthData,
                private data: ServerDataService,
                private _router: Router,
                private globals: Globals) {
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.globals.title = 'Settings';
        }
      });
    }

    // Functions
    ngOnInit() {
      this.loadData();
    }

    loadData() {
      this.dataLoading = false;
      this.getCompanies((company: Company) => {
        this.globals.title = `Settings | ${ this.globals.currentCompany.name }`;
        if (!company) { this.loadData(); }
        this.getCountries((countries: Array<Country>) => {
          if (!countries) { this.loadData(); }
          this.getRoles((roles: Array<Role>) => {
            if (!roles) { this.loadData(); }
            this.getDeviceTypes((deviceTypes: Array<DeviceType>) => {
              if (!deviceTypes) { this.loadData(); }
              this.getUsers((users: Array<User>) => {
                if (!users) { this.loadData(); }
                this.getSites((sites: Array<Site>) => {
                  if (!sites) { this.loadData(); }
                  this.dataLoading = true;
                });
              });
            });
          });
        });
      });
    }

    // #region Data Sources

    getCompanies(next?: any) {
      // if (!this.globals.currentCompany) {
        this.data.companies({name: 'Globant'})
          .then((company: Array<Company>) => {
            if (company.length) {
              this.companyCollection = company;
              this.globals.currentCompany = company[0];
              this.globals.title = `Settings | ${ this.globals.currentCompany.name }`;
              if (next) { next(company[0]); }
            } else {
              if (next) { next([]); }
            }
          })
          .catch(e => { console.log(e); if (next) { next(null); } });
      // } else {
      //   if (next) { next(this.globals.currentCompany); }
      // }
    }

    getCountries(next?: any) {
      // if (!this.globals.countries || !this.globals.countries.length) {
        this.data.countries()
        .then((c: Array<Country>) => {
          if (c.length) {
            this.globals.countries = c;
            this.countryCollection = this.globals.countries;
            if (next) { next(c); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); }});
    }

    getSites(next?: any) {
      let query = { idcompany: this.globals.currentCompany.idcompany };
      this.data.sites(query)
        .then((site: Array<Site>) => {
          if (site.length) {
            site = site.map((s: Site) => {
              let country = this.globals.countries.filter(c => { return c.idcountry === s.idcountry; })[0];
              s.countryName = country.name;
              return s;
            });
            this.sitesCollection = site;
            if (next) { next(site); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => {
          console.log(e);
          if (next) { next(null); }
        });
    }

    getUsers(next?: any) {
      this.data.users()
        .then((users: Array<User>) => {
          if (users.length) {
            this.usersCollection = users;
            if (next) { next(users); }
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
        .then((roles: Array<Role>) => {
          if (roles.length) {
            this.rolesCollection = roles;
            if (next) { next(roles); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => {
          console.log(e);
          if (next) { next(null); }
        });
    }

    getDeviceTypes(next?: any) {
      this.data.deviceTypes()
        .then((deviceTypes: Array<DeviceType>) => {
          if (deviceTypes.length) {
            this.deviceTypesCollection = deviceTypes;
            if (next) { next(deviceTypes); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => {
          console.log(e);
          if (next) { next(null); }
        });
    }

    // #endregion

    doOpenPanel(event: any) {
      this.panelControl.show = true;
    }

    doClosePanel(event: any) {
      this.panelControl.show = false;
      this.resetPanel();
    }

    resetPanel() {
      this.showFormSite = false;
      this.showFormUser = false;
      this.showFormDeviceType = false;
      this.showFormCountry = false;
    }

    openSitePanel(event: any) {
      this.panelControl.title = 'New';
      this.panelControl.subtitle = 'Site';
      this.showFormSite = true;
      this.doOpenPanel(event);
    }

    openUserPanel(event: any) {
      this.panelControl.title = 'New';
      this.panelControl.subtitle = 'User';
      this.showFormUser = true;
      this.doOpenPanel(event);
    }

    openDeviceTypePanel(event: any) {
      this.panelControl.title = 'New';
      this.panelControl.subtitle = 'Device-Type';
      this.showFormDeviceType = true;
      this.doOpenPanel(event);
    }

    openCountryPanel(event: any) {
      this.panelControl.title = 'New';
      this.panelControl.subtitle = 'Country';
      this.showFormCountry = true;
      this.doOpenPanel(event);
    }

    onSubmitForm(event: any) {
      if (event) {
        this.doClosePanel(event);
        this.loadData();
      }
    }

    resetModel() {
      this.siteModel = new Site();
    }
}

