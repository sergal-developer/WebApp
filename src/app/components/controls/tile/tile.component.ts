import { Component, OnInit, Input, Output, OnChanges, EventEmitter, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Site, Floor, Room, Device, DeviceType } from '../../models/models';
import { ServerDataService } from '../../services/data/data';
import { AuthData } from '../../services/security/auth.data';
import { Globals } from '../../services/globals/globals';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'tile',
  templateUrl: './tile.html',
  styleUrls: ['./tile.scss']
})

export class TileComponent implements OnInit {
  // Properties
  @Input() id?: string;
  @Input() site: Site;
  @Input() selected?: Boolean;
  @Output() onBeforeActive: EventEmitter<any> = new EventEmitter();
  @Output() onBeforeInactive: EventEmitter<any> = new EventEmitter();

  public chart: any = {
    view: null,
    showXAxis: true,
    showYAxis: true,
    gradient: true,
    showLegend: false,
    showXAxisLabel: false,
    xAxisLabel: 'Devices',
    showYAxisLabel: false,
    yAxisLabel: 'Consumption',
    colorScheme: {
      domain: ['#eb925e', '#DEC4A1', '#A9E1BF', '#82B6C7', '#ded61d', '#e06363', '#138098' ]
    },
    autoScale: true,
  };

  multi: any;
  showDelayData: Boolean = false;
  showChart: Boolean = false;
  existData: Boolean = false;
  dataLoading = false;

  private AdminMode = false;
  _Floors: Array<Floor> = [];
  _Rooms: Array<Room> = [];
  _Devices: Array<Device> = [];
  _DevicesGroup: Array<any> = [];

  constructor(private data: ServerDataService,
              private globals: Globals,
              private element: ElementRef,
              private sanitizer: DomSanitizer) {}

  // Functions
  ngOnInit() {
    this.checkPermissions();
    this.loadData();
  }

  checkPermissions() {
    let rolesValid = ['ROOT', 'ADMIN', 'SITEADMIN'];
    if ( rolesValid.indexOf(this.globals.currentRole.name) !== -1 ) {
      this.AdminMode = true;
    } else {
      this.AdminMode = false;
    }
  }

  toggleActive() {
    if (this.selected) {
      this.onBeforeInactive.emit(this.selected);
      this.selected = this.showChart = this.showDelayData = false;
    } else {
      this.gotoTile();
      this.onBeforeActive.emit(this.id);
      this.selected = true;
      setTimeout(() => {
        this.showChart = this.showDelayData = true;
      }, 1500);
    }
  }

  gotoTile() {
    let query = `.tile-component #${ this.id }`;
    let div = document.querySelector(query);
  }

  loadData() {
    this.multi = multi;
    this.dataLoading = false;
    this.getFloors((floorsTemp: Array<Floor>) => {
      this.existData = floorsTemp.length ? true : false;
      if (floorsTemp.length) {
        this.site.floors = floorsTemp;
        this.site.floors.forEach((floorTemp: Floor) => {
          this._Floors.push(floorTemp);
          this.getRooms(floorTemp, (roomsTemp: Array<Room>) => {
            if (roomsTemp.length) {
              floorTemp.rooms = roomsTemp;
              roomsTemp.forEach((roomTemp: Room) => {
                this._Rooms.push(roomTemp);

                this.getDevices(roomTemp, (devicesTemp: Array<Device>) => {
                  if (devicesTemp.length) {
                    roomTemp.devices = devicesTemp;
                    devicesTemp.forEach((deviceTemp: Device) => {
                      this._Devices.push(deviceTemp);
                    });
                    this.dataLoading = true;
                    this.groupDevices();
                  } else { this.dataLoading = true; }
                  console.log('this.site: ', this.site);
                });
              });
            } else { this.dataLoading = true; }
          });
        });
      } else { this.dataLoading = true; }
    });
  }

  // #region Data Sources
  getFloors(next?: any) {
    let query = { idsite: this.site.idsite };
    this.data.floors(query)
      .then((d: Array<Floor>) => {
        this.site.floors = d;
        if (next) { next(d); }
      })
      .catch((error) => { console.log(error); if (next) { next(null); }});
  }

  getRooms(floor: Floor, next?: any) {
    let query = { idfloor: floor.idfloor };
    this.data.rooms(query)
      .then((d: Array<Room>) => {
        floor.rooms = d;
        if (next) { next(d); }
      })
      .catch((error) => { console.log(error); if (next) { next(null); }});
  }

  getDevices(room: Room, next?: any) {
    let query = { idroom: room.idroom };
    this.data.devices(query)
      .then((d: Array<Device>) => {
        if (d.length) {
          d = d.map(x => {
            x['deviceType'] = this.globals.deviceTypes.filter(t => { return t.iddevicetype === x.idtype; })[0];
            return x;
          });
          room.devices = d;
        }
        if (next) { next(d); }
      })
      .catch((error) => { console.log(error); if (next) { next(null); }});
  }
  // #endregion

  groupDevices() {
    if (this._Devices.length) {
      this._Devices.forEach(d => {
        if (d && this._DevicesGroup.indexOf(d) === -1) {
          this._DevicesGroup.push(d.deviceType.type.toUpperCase());
        }
      });
    }
    this._DevicesGroup = this.removeDuplicates(this._DevicesGroup);
  }

  getDevicesByType(type: string) {

  }

  removeDuplicates(arr: Array<any>) {
      let unique = [];
      for (let i = 0; i < arr.length; i++) {
          if (unique.indexOf(arr[i]) === -1) {
              unique.push(arr[i]);
          }
      }
      return unique;
  }

  getLinearDevices(floor: Floor): Array<Device> {
    let devices: Array<Device> = [];
    if (floor.rooms) {
      floor.rooms.forEach((r: Room) => {
        if (r.devices) {
          r.devices.forEach((d: Device) => {
            d['room'] = r;
            devices.push(d);
          });
        }
      });
    }
    return devices;
  }


}

let multi = [
  {
    'name': 'Temperature',
    'series': [
      { 'value': 11, 'name': '2018-01-01' },
      { 'value': 21, 'name': '2018-01-05' },
      { 'value': 15, 'name': '2018-01-10' },
      { 'value': 18, 'name': '2018-01-15' },
      { 'value': 20, 'name': '2018-01-20' },
      { 'value': 22, 'name': '2018-01-25' },
      { 'value': 25, 'name': '2018-01-28' },
      { 'value': 23, 'name': '2018-02-01' },
      { 'value': 21, 'name': '2018-02-05' },
      { 'value': 17, 'name': '2018-02-10' },
      { 'value': 16, 'name': '2018-02-15' },
      { 'value': 28, 'name': '2018-02-20' },
      { 'value': 29, 'name': '2018-02-25' },
      { 'value': 18, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Light',
    'series': [
      { 'value': 61, 'name': '2018-01-01' },
      { 'value': 51, 'name': '2018-01-05' },
      { 'value': 71, 'name': '2018-01-10' },
      { 'value': 41, 'name': '2018-01-15' },
      { 'value': 61, 'name': '2018-01-20' },
      { 'value': 41, 'name': '2018-01-25' },
      { 'value': 32, 'name': '2018-01-28' },
      { 'value': 56, 'name': '2018-02-01' },
      { 'value': 87, 'name': '2018-02-05' },
      { 'value': 65, 'name': '2018-02-10' },
      { 'value': 75, 'name': '2018-02-15' },
      { 'value': 82, 'name': '2018-02-20' },
      { 'value': 51, 'name': '2018-02-25' },
      { 'value': 10, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Humidity',
    'series': [
      { 'value': 37, 'name': '2018-01-01' },
      { 'value': 47, 'name': '2018-01-05' },
      { 'value': 57, 'name': '2018-01-10' },
      { 'value': 37, 'name': '2018-01-15' },
      { 'value': 17, 'name': '2018-01-20' },
      { 'value': 7, 'name': '2018-01-25' },
      { 'value': 77, 'name': '2018-01-28' },
      { 'value': 17, 'name': '2018-02-01' },
      { 'value': 47, 'name': '2018-02-05' },
      { 'value': 77, 'name': '2018-02-10' },
      { 'value': 27, 'name': '2018-02-15' },
      { 'value': 87, 'name': '2018-02-20' },
      { 'value': 17, 'name': '2018-02-25' },
      { 'value': 2, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Preasure',
    'series': [
      { 'value': 100, 'name': '2018-01-01' },
      { 'value': 130, 'name': '2018-01-05' },
      { 'value': 150, 'name': '2018-01-10' },
      { 'value': 180, 'name': '2018-01-15' },
      { 'value': 110, 'name': '2018-01-20' },
      { 'value': 60, 'name': '2018-01-25' },
      { 'value': 70, 'name': '2018-01-28' },
      { 'value': 10, 'name': '2018-02-01' },
      { 'value': 30, 'name': '2018-02-05' },
      { 'value': 70, 'name': '2018-02-10' },
      { 'value': 190, 'name': '2018-02-15' },
      { 'value': 10, 'name': '2018-02-20' },
      { 'value': 109, 'name': '2018-02-25' },
      { 'value': 110, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Electricity',
    'series': [
      { 'value': 123, 'name': '2018-01-01' },
      { 'value': 543, 'name': '2018-01-05' },
      { 'value': 612, 'name': '2018-01-10' },
      { 'value': 12, 'name': '2018-01-15' },
      { 'value': 213, 'name': '2018-01-20' },
      { 'value': 123, 'name': '2018-01-25' },
      { 'value': 340, 'name': '2018-01-28' },
      { 'value': 234, 'name': '2018-02-01' },
      { 'value': 65, 'name': '2018-02-05' },
      { 'value': 214, 'name': '2018-02-10' },
      { 'value': 654, 'name': '2018-02-15' },
      { 'value': 173, 'name': '2018-02-20' },
      { 'value': 10, 'name': '2018-02-25' },
      { 'value': 634, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Infrared',
    'series': [
      { 'value': 300, 'name': '2018-01-01' },
      { 'value': 123, 'name': '2018-01-05' },
      { 'value': 151, 'name': '2018-01-10' },
      { 'value': 218, 'name': '2018-01-15' },
      { 'value': 240, 'name': '2018-01-20' },
      { 'value': 422, 'name': '2018-01-25' },
      { 'value': 225, 'name': '2018-01-28' },
      { 'value': 213, 'name': '2018-02-01' },
      { 'value': 621, 'name': '2018-02-05' },
      { 'value': 117, 'name': '2018-02-10' },
      { 'value': 316, 'name': '2018-02-15' },
      { 'value': 128, 'name': '2018-02-20' },
      { 'value': 629, 'name': '2018-02-25' },
      { 'value': 118, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Water',
    'series': [
      { 'value': 0, 'name': '2018-01-01' },
      { 'value': 26, 'name': '2018-01-05' },
      { 'value': 21, 'name': '2018-01-10' },
      { 'value': 16, 'name': '2018-01-15' },
      { 'value': 99, 'name': '2018-01-20' },
      { 'value': 12, 'name': '2018-01-25' },
      { 'value': 44, 'name': '2018-01-28' },
      { 'value': 65, 'name': '2018-02-01' },
      { 'value': 82, 'name': '2018-02-05' },
      { 'value': 34, 'name': '2018-02-10' },
      { 'value': 27, 'name': '2018-02-15' },
      { 'value': 87, 'name': '2018-02-20' },
      { 'value': 53, 'name': '2018-02-25' },
      { 'value': 65, 'name': '2018-02-28' }
    ]
  }
];
