import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Country } from '../../../../components/models/models';
import { FormControl, Validators } from '@angular/forms';
import { ServerDataService } from '../../../../components/services/data/data';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'country-form',
  templateUrl: './country.html',
  styleUrls: ['./country.scss']
})

export class CountryFormComponent implements OnInit {
  @Input() model: Country;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() doUpdate: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;

  constructor(private data: ServerDataService) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new Country();
    }
  }

  public submit() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.countryNew(this.model)
        .then(res => {
          if (res) {
            this.reset();
            if (this.doSubmit) { this.doSubmit.emit(true); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new country`;
          console.error(e);
          if (this.doSubmit) { this.doSubmit.emit(null); }
        });
    }
  }

  public update() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.countryUpdate(this.model)
        .then(res => {
          if (res) {
            this.reset();
            if (this.doUpdate) { this.doUpdate.emit(true); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new country`;
          console.error(e);
          if (this.doUpdate) { this.doUpdate.emit(null); }
        });
    }
  }

  public reset() {
    this.model = new Country();
  }

  public validateFields() {
    this.validationFields = {};
    const log = this.model.validate();
    log.errors.forEach(e => {
      this.validationFields[e] = `${e} is <strong>required</strong>`;
    });
    return log.status;
  }
}
