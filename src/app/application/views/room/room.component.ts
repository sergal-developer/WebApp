import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../components/services/services.data';
import { Company, Site, Floor, Room, Device, Map, Mapping, DeviceType, DeviceStatus } from '../../../components/models/models';
import { Globals } from '../../../components/services/globals/globals';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'room',
  templateUrl: './room.html',
  styleUrls: ['./room.scss']
})

export class RoomComponent implements OnInit {
  // Properties
  public siteKey: String;
  public roomId: String;
  public site: Site;
  public stats: any = [];
  public floors: Array<Floor> = [];
  public room: Room;
  public devices: Array<Device> = [];
  public random: any;
  public deviceModel: Device = new Device();
  public form: any;
  public devicePanelOpen = false;
  public deviceLayerStyle: any;
  public deviceTypes: Array<DeviceType> = [];

  public panelControl = {
    show: false,
    title: 'New User',
    subtitle: '',
    type: 'panel-float right',
    size: 'small'
  };

  public bMouseDragging = false;
  public nMouseOffsetX = 0;
  public nMouseOffsetY = 0;
  public currentElement = '';
  public mapBlocked: boolean;

  constructor(private globals: Globals,
              private _dataService: DataService,
              private route: ActivatedRoute,
              private _router: Router,
              private sanitizer: DomSanitizer) {
      this.siteKey = route.snapshot.params['site'];
      this.roomId = route.snapshot.params['id'];

      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.updateNavigationTitle('Room');
          }
      });
  }

  updateNavigationTitle(title: string) {
    this.globals.title = title;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.deviceTypes = [];
    this.deviceModel.idstatus = DeviceStatus.NOTAVAILABLE;
    this.deviceModel.active = true;

    console.log('this.deviceModel: ', this.deviceModel);

    this._dataService.getAll(`/sites?key=${ this.siteKey }`).subscribe((sites: Array<Site>) => {
      this.site = sites[0];
      this._dataService.getAll(`/rooms?idroom=${ this.roomId }`).subscribe((rooms: Array<Room>) => {
        this.room = rooms[0];
          this._dataService.getAll(`/devices?idroom=${ this.room.idroom }`).subscribe((devices: Array<Device>) => {
            this.room.devices = this.devices = devices;
            this.devices.forEach(d => {
              this.readDatafromdevice(d);
            });
            // this.startReadData(); // this is mock data
            this.setup();
          });
        this.floors = this.site.floors;
      });
    });

    this._dataService.getAll(`/device-types`).subscribe((devicesTypes: Array<DeviceType>) => {
      this.deviceTypes = devicesTypes;
    });
  }


  // #region Open Modals
  doOpenPanel(event: any) {
    this.panelControl.show = true;
  }

  doClosePanel(event: any) {
    this.panelControl.show = false;
    this.resetPanel();
  }

  resetPanel() {}

  openDevicePanel(event: any) {
    this.panelControl.title = 'New';
    this.panelControl.subtitle = 'Device';
    this.doOpenPanel(event);
  }

  onSubmitForm(event: any) {
    if (event) {
      this.doClosePanel(event);
      this.loadData();
    }
  }
  // #endregion

  startReadData() {
    setInterval(() => {
      if (this.devices) {
        this.devices.map((d: any) => {
          d.value = this.mockRandomData();
        });
      }
    }, 1000);
  }

  readDatafromdevice(device: Device) {
    device.value = 0; // set initial value before read data from server
    setInterval(() => {
      this._dataService.getAll(`/message-sensor?sensorId=${ device.topic }&$sort[createdAt]=-1`).subscribe((data: any) => {
        console.log('data: ', data.data);
        if (data.data && data.data[0].message) {
          device.value = data.data[0].message;
        } else {
          device.value = 0;
        }
      });
    }, this.globals.intervalReadData);
  }

  mockRandomData() {
    return (Math.random() * (30.120 - 28.0200) + 1.0200).toFixed(3);
  }

  setup() {
    this.updateNavigationTitle(`${ this.site.name} | ${ this.room.name }`);
    this.deviceModel.idroom = this.room.idroom;
    this.deviceModel.topic = `globant/${this.site.idcountry}/${this.site.key}/common/
      ${ this.getDeviceTypeName(this.deviceModel.idtype) }/${this.deviceModel.name}`;

    // // get size of image
    this.deviceLayerStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${ this.room.map.width }px;
      height:${ this.room.map.height }px; margin-top:-${ this.room.map.height }px`);
  }

  updateTopic(event: Event) {
    const deviceType = this.getDeviceTypeName(this.deviceModel.idtype);
    let topic = `globant/MXN/${this.site.name}/common/${ deviceType }/${this.deviceModel.name}`;
    topic = topic.replace(' ', '').replace('//', '/');
    this.deviceModel.topic = topic;
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

  setPositionDevice(x: number, y: number) {
    return this.sanitizer.bypassSecurityTrustStyle(`left: ${x}px; top:${y}px;`);
  }

  setWidthMapContainer(width: Number) {
    // return this.sanitizer.bypassSecurityTrustStyle(`width: ${ width }px; transform: scale(1.5);`);
    return this.sanitizer.bypassSecurityTrustStyle(`width: ${ width }px;`);
  }

  setSizeMapContainer(width: Number, height: Number) {
    // return this.sanitizer.bypassSecurityTrustStyle(`width: ${ width }px; transform: scale(1.5);`);
    return this.sanitizer.bypassSecurityTrustStyle(`width: ${ width }px; height: ${ height }px;`);
  }

  validateDevice() {
    const errors = [];
    for (const k in this.deviceModel) {
      if (this.deviceModel[k] === undefined ||
        this.deviceModel[k] === null ||
        this.deviceModel[k] === '' ||
        this.deviceModel[k] === 0) {
        errors.push(k);
      }
    }
    if (errors.length > 0 ) {
      console.log('Errors: ', errors);
      return false;
    }
    return true;
  }

  submitNewDevice() {
    if (this.validateDevice()) {
      console.log('this.deviceModel: ', this.deviceModel);
      this._dataService.createData('/devices', this.deviceModel).subscribe(res => {
        this.loadData();
        this.togglePanelDevice();
      });
    }
  }

  togglePanelDevice() {
    if (this.devicePanelOpen) {
      this.devicePanelOpen = false;
    } else {
      this.devicePanelOpen = true;
      this.deviceModel.ip = this.globals.server.devicesStored.ip;
      this.deviceModel.port = this.globals.server.devicesStored.port;
    }
  }

  // #region map-behaviors

  initComponentMap() {
    const maps = document.querySelectorAll('.map-viewer.room use');
    [].forEach.call(maps, (element: Element) => {
      element.addEventListener('mousedown', (e: any) => { this.mouseDown(e, element.id); });
      element.addEventListener('mouseup', (e: any) => { this.mouseUp(e); });
      element.addEventListener('mousemove', (e: any) => { this.mouseMove(e, element.id); });
    });
  }

  mouseDown(e: MouseEvent, id: string) {
    if (!this.bMouseDragging && this.mapBlocked) {
      this.bMouseDragging = true;
      const p = { x: e.clientX, y: e.clientY};
      const element = document.querySelector(`#${id}`);
      if (element && !element.getAttribute('disabled')) {
        this.currentElement = id;
        this.nMouseOffsetX = p.x - parseInt(element.getAttribute('x'), null);
        this.nMouseOffsetY = p.y - parseInt(element.getAttribute('y'), null);
      }
    }
  }

  mouseUp(e: MouseEvent) {
      this.bMouseDragging = false;
      this.currentElement = '';
  }

  mouseMove(e: MouseEvent, id: string) {
      if (this.bMouseDragging && this.mapBlocked) {
        const p = { x: e.clientX, y: e.clientY};
        const element = document.querySelector(`#${id}`);
        if (element && this.currentElement === id && !element.getAttribute('disabled')) {
            const position = { x: p.x - this.nMouseOffsetX, y: p.y - this.nMouseOffsetY};
            element.setAttribute('x', `${p.x - this.nMouseOffsetX}`);
            element.setAttribute('y', `${p.y - this.nMouseOffsetY}`);
        }
      }
  }

  unblockMap() {
    this.initComponentMap();
    this.mapBlocked = true;
  }

  saveChangesMap() {
    this.mapBlocked = false;
    // get all maps
    const maps = document.querySelectorAll('.map-viewer.room use');
    // get info from each map
    [].forEach.call(maps, (elm: Element) => {
      const id = parseInt(elm.getAttribute('propid'), null);
      const map_x = parseInt(elm.getAttribute('x'), null);
      const map_y = parseInt(elm.getAttribute('y'), null);
      const device: Device = this.devices.filter((d: Device) => {
        return d.iddevice === id;
      })[0];
      if ( device && device.mapping.x !== map_x && device.mapping.y !== map_y) {
        device.mapping.x = map_x;
        device.mapping.y = map_y;
        this.updateDevice(device);
      }
    });
  }

  updateDevice(device: Device) {
    let data = { mapping: device.mapping };
    this._dataService.updateData(`/devices?iddevice=${ device.iddevice }`, data).subscribe(res => {
      this.loadData();
    });
  }

  discardChangesMap() {
    this.mapBlocked = false;
    this.loadData();
  }

  // #endregion
}
