import { Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Device, Floor, Room } from '../../models/models';
import { ServerDataService } from '../../services/data/data';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'device-item',
  templateUrl: './device-item.html',
  styleUrls: ['./device-item.scss']
})

export class DeviceItemComponent implements OnInit, OnDestroy {

    // Properties
    @Input() device: Device;
    @Input() room: Room;
    private dataLoading: Boolean = false;
    socket: any;

    constructor(private sanitizer: DomSanitizer,
                private data: ServerDataService) {}
    // Functions

    ngOnInit() {
      if (this.device) {
        this.loadData();
      }
    }

    ngOnDestroy() {
      this.socket = null;
    }

    loadData() {
      this.dataLoading = false;
      if (!this.room) {
        this.getRooms((room: Room) => {
          this.dataLoading = true;
        });
      }
      // this.readData();
    }

    private getRooms(next?: any) {
      let query = { idroom: this.device.idroom };
      this.data.rooms(query)
        .then((d: Array<Room>) => {
          this.room = d[0];
          if (next) { next(d); }
        })
        .catch((error) => { console.log(error); if (next) { next(null); }});
    }

    readData() {
      this.device['value'] = 0;
      this.device.historyValues = this.device.historyValues ? this.device.historyValues : [];
      this.socket = setInterval(() => {
        this.device.value = this.mockRandomData();
        let dataRow = { value: this.device.value, date: JSON.stringify(new Date()) };
        this.device.historyValues.push(dataRow);
        console.log('this.device: ',  this.device.historyValues);
      }, 5000);
    }


    // readDatafromdevice(device: Device) {
    //   device.value = 0; // set initial value before read data from server
    //   setInterval(() => {
    //     this._dataService.getAll(`/message-sensor?sensorId=${ device.topic }&$sort[createdAt]=-1`).subscribe((data: any) => {
    //       console.log('data: ', data.data);
    //       if (data.data && data.data[0].message) {
    //         device.value = data.data[0].message;
    //       } else {
    //         device.value = 0;
    //       }
    //     });
    //   }, this.globals.intervalReadData);
    // }

    mockRandomData() {
      return (Math.random() * (100.120 - 28.0200) + 10.0200).toFixed(0);
    }
}
