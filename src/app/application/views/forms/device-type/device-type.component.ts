import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DeviceType } from '../../../../components/models/models';
import { FormControl, Validators } from '@angular/forms';
import { ServerDataService } from '../../../../components/services/data/data';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'device-type-form',
  templateUrl: './device-type.html',
  styleUrls: ['./device-type.scss']
})

export class DeviceTypeFormComponent implements OnInit {
  @Input() model: DeviceType;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() doUpdate: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;

  constructor(private data: ServerDataService) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new DeviceType();
    }
  }

  public submit() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.deviceTypeNew(this.model)
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
      this.data.deviceTypeUpdate(this.model)
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
    this.model = new DeviceType();
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
