import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Site, Country, Company, File } from '../../../../components/models/models';
import { FormControl, Validators } from '@angular/forms';
import { ServerDataService } from '../../../../components/services/data/data';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'site-form',
  templateUrl: './site.html',
  styleUrls: ['./site.scss']
})

export class SiteFormComponent implements OnInit {
  @Input() model: Site;
  @Input() countries: Array<Country>;
  @Input() companies: Array<Company>;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() doUpdate: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;

  constructor(private data: ServerDataService) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new Site();
    }
    this.countries = this.countries || [];
    this.companies = this.companies || [];

    if (this.countries.length === 1) {
      this.model.idcountry = this.countries[0].idcountry;
    }

    if (this.companies.length === 1) {
      this.model.idcompany = this.companies[0].idcompany;
    }
  }

  public submit() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.siteNew(this.model)
        .then(res => {
          if (res) {
            this.submitFiles(this.model.key);
            this.reset();
            if (this.doSubmit) { this.doSubmit.emit(true); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new Site`;
          console.error(e);
          if (this.doSubmit) { this.doSubmit.emit(null); }
        });
    }
  }

  public update() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.siteUpdate(this.model)
        .then(res => {
          if (res) {
            this.reset();
            if (this.doUpdate) { this.doUpdate.emit(true); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new Site`;
          console.error(e);
          if (this.doUpdate) { this.doUpdate.emit(null); }
        });
    }
  }

  public reset() {
    this.model = new Site();
  }

  public validateFields() {
    this.validationFields = {};
    const log = this.model.validate();
    log.errors.forEach(e => {
      this.validationFields[e] = `${e} is <strong>required</strong>`;
    });
    return log.status;
  }

  submitFiles(key: string) {
    const files = this.createFileDummy(key);
    files.forEach(f => {
      this.data.fileNew(f).then(d => { console.log('File : ', d); });
    });
  }

  createFileDummy(key: string) {
    const files: Array<File> = [];
    FilesDummy.forEach(f => {
      const model = new File();
          model.key = key;
          model.name = f;
          model.folder = key;
          model.path = `${ key }\\${f}`;
      files.push(model);
    });
    return files;
  }

}

// tslint:disable-next-line:max-line-length
const FilesDummy = ['MX-12-Base.svg', 'MX-12-Lobby.svg', 'MX-12-R1.svg', 'MX-12-R10.svg', 'MX-12-R11.svg', 'MX-12-R12.svg', 'MX-12-R13.svg', 'MX-12-R2.svg', 'MX-12-R3.svg', 'MX-12-R4.svg', 'MX-12-R5.svg', 'MX-12-R6.svg', 'MX-12-R7.svg', 'MX-12-R8.svg', 'MX-12-R9.svg' ];
