import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DeviceType, Device, Site, Room,
         DeviceStatus, NotificationEntity, NotificationState, NotificationType } from '../../../../components/models/models';
import { ServerDataService } from '../../../../components/services/data/data';
import { Globals } from '../../../../components/services/globals/globals';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'device-form',
  templateUrl: './device.html',
  styleUrls: ['./device.scss']
})

export class DeviceFormComponent implements OnInit {
  @Input() model: Device;
  @Input() deviceTypes: Array<DeviceType>;
  @Input() site: Site;
  @Input() room: Room;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() doUpdate: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;

  private notification: NotificationEntity = new NotificationEntity();

  constructor(private data: ServerDataService,
              private globals: Globals) {}

  ngOnInit() {
    if (!this.model) {
      this.reset();
    }
  }

  public submit() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.deviceNew(this.model)
        .then((res: Device) => {
          if (res) {
            this.createNotification(res.iddevice, (n: any) => {
              this.reset();
              if (this.doSubmit) { this.doSubmit.emit(true); }
            });
          } else {
            if (this.doSubmit) { this.doSubmit.emit(null); }
          }
        })
        .catch(e => {
          this.errorLog = `Error send new device`;
          console.error(e);
          if (this.doSubmit) { this.doSubmit.emit(null); }
        });
    }
  }

  createNotification(iddevice: number, next?: any) {
    this.notification.iddevice = iddevice;
    this.notification.idsite = this.site.idsite;
    this.notification.iduser = this.globals.currentUser.iduser;
    this.notification.description = `Requesting installation of component ${ this.model.name },
     for the site: ${this.site.name}, in room: ${this.room.name}`;
    this.notification.state = NotificationState.PENDING;
    this.notification.type = NotificationType.INSTALLATION;

    if ( this.validateNotification() ) {
      this.data.notificationNew(this.notification)
        .then(res => {
          if (next) { next(res); }
        })
        .catch(e => { this.errorLog = `Error send new notification`; console.error(e); if (next) { next(null); } });
    }
  }

  public update() {
    this.errorLog = '';
    if (this.validateFields()) {
      this.data.deviceUpdate(this.model)
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
    this.model = new Device();
    this.model.ip = this.globals.server.devicesStored.ip;
    this.model.port = this.globals.server.devicesStored.port;
    this.model.idroom = this.room.idroom;
    this.model.idstatus = DeviceStatus.NEW;
  }

  public validateFields() {
    this.validationFields = {};
    const log = this.model.validate();
    log.errors.forEach(e => {
      this.validationFields[e] = `${e} is <strong>required</strong>`;
    });
    return log.status;
  }

  public validateNotification() {
    this.validationFields = {};
    const log = this.notification.validate();
    log.errors.forEach(e => {
      this.validationFields[e] = `${e} is <strong>required</strong>`;
    });
    return log.status;
  }

  updateTopic(event: Event) {
    const deviceType = this.getDeviceTypeName(this.model.idtype);
    let topic = `globant/MXN/${this.site.name}/common/${ deviceType }/${this.model.name}`;
    topic = topic.replace(' ', '').replace('//', '/');
    this.model.topic = topic;
  }

  getDeviceTypeName(id: number) {
    const response = this.deviceTypes.filter(i => {
      return i.iddevicetype === id;
    })[0];
    if (response) {
      return response.type;
    } else {
      return '';
    }
  }

}
