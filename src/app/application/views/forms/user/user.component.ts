import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { User, Country, Company, Role, Site } from '../../../../components/models/models';
import { FormControl, Validators } from '@angular/forms';
import { ServerDataService } from '../../../../components/services/data/data';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'user-form',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})

export class UserFormComponent implements OnInit {
  @Input() model: User;
  @Input() countries: Array<Country>;
  @Input() sites: Array<Site>;
  @Input() roles: Array<Role>;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() doUpdate: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;
  private showSites: Boolean = false;
  private rolesSelected: Array<Role> = [];

  constructor(private data: ServerDataService) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new User();
    }
    this.countries = this.countries || [];
    this.sites = this.sites || [];
    this.roles = this.roles || [];

    if (this.countries.length === 1) {
      this.model.userInformation.location = this.countries[0].idcountry;
    }
  }

  public submit() {
    this.errorLog = '';
    this.fillUser();
    if (this.validateFields()) {
      this.data.userNew(this.model)
        .then(res => {
          if (res) {
            this.reset();
            if (this.doSubmit) { this.doSubmit.emit(true); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new User`;
          console.error(e);
          if (this.doSubmit) { this.doSubmit.emit(null); }
        });
    }
  }

  public update() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.userUpdate(this.model)
        .then(res => {
          if (res) {
            this.reset();
            if (this.doUpdate) { this.doUpdate.emit(true); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new User`;
          console.error(e);
          if (this.doUpdate) { this.doUpdate.emit(null); }
        });
    }
  }

  public reset() {
    this.model = new User();
  }

  public validateFields() {
    this.validationFields = {};
    const log = this.model.validate();
    log.errors.forEach(e => {
      this.validationFields[e] = `${e} is <strong>required</strong>`;
    });
    return log.status;
  }

  fillUser() {
    this.errorsField = [];
    this.model.token = this.model.userInformation.username;
    this.model.userInformation.hd = 'globant.com';
    this.model.userInformation.globerName = [
    this.model.userInformation.givenName,
    this.model.userInformation.middleName,
    this.model.userInformation.familyName ];
    this.model.userInformation.sitesView = !this.showSites ? [] : this.model.userInformation.sitesView;
  }

  onChangeRole(event: any) {
    if (event.value.length) {
      this.showSites = this.requireSites(event.value);
      this.model.userInformation.roles = this.rolesSelected.map((i: Role) => ({ 'name': i.name }));
    } else {
      this.model.userInformation.roles = [];
    }
  }

  private requireSites(list: Array<any>) {
    const isAdmin = list.filter((r: any) => {
      return r.idrole === 1 || r.idrole === 2;
    });

    if (isAdmin && isAdmin.length) {
      return false;
    } else {
      return true;
    }
  }
}
