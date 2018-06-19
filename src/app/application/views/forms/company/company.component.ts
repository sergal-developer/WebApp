import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Company } from '../../../../components/models/models';
import { FormControl, Validators } from '@angular/forms';
import { ServerDataService } from '../../../../components/services/data/data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'company-form',
  templateUrl: './company.html',
  styleUrls: ['./company.scss']
})

export class CompanyFormComponent implements OnInit {
  @Input() model: Company;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;

  constructor(private data: ServerDataService) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new Company();
    }
  }

  public submit() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.companyNew(this.model)
        .then(res => {
          if (res) {
            this.reset();
            if (this.doSubmit) { this.doSubmit.emit(true); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new company`;
          console.error(e);
          if (this.doSubmit) { this.doSubmit.emit(null); }
        });
    }
  }

  public reset() {
    this.model = new Company();
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
