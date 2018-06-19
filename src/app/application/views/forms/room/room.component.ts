import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ServerDataService } from '../../../../components/services/data/data';
import { Site, Country, Company, Floor, Room, Map } from '../../../../components/models/models';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'room-form',
  templateUrl: './room.html',
  styleUrls: ['./room.scss']
})

export class RoomFormComponent implements OnInit {
  @Input() model: Room;
  @Input() maps: Array<Map>;
  @Input() floors: Array<Floor>;
  @Input() currentFloor: Floor;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() doUpdate: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;

  constructor(private data: ServerDataService) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new Room();
    }
    this.floors = this.floors || [];
    this.maps = this.maps || [];
  }

  public submit() {
    this.errorLog = '';
    this.model.map = this.getPropertiesMap(this.model.map, true);
    if (this.validateFields()) {
      this.data.roomNew(this.model)
        .then(res => {
          if (res) {
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
      this.data.roomUpdate(this.model)
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
    this.model = new Room();
  }

  public validateFields() {
    this.validationFields = {};
    const log = this.model.validate();
    console.log('log: ', log);
    log.errors.forEach(e => {
      this.validationFields[e] = `${e} is <strong>required</strong>`;
    });
    return log.status;
  }

  getPropertiesMap(map: Map, isFloor?: boolean): Map {
    if (map != null) {
      const props = document.querySelector('.roomForm .preview-svg-ghost svg-item img');
      map.disabled = isFloor ? isFloor : false;
      map.width = props.clientWidth;
      map.height = props.clientHeight;
      map.x = 0;
      map.y = 0;
      return map;
    }
    return null;
  }
}
