import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ServerDataService } from '../../../../components/services/data/data';
import { Site, Country, Company, Floor, Map } from '../../../../components/models/models';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'floor-form',
  templateUrl: './floor.html',
  styleUrls: ['./floor.scss']
})

export class FloorFormComponent implements OnInit {
  @Input() model: Floor;
  @Input() site: Site;
  @Input() maps: Array<Map>;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() doUpdate: EventEmitter<any> = new EventEmitter();

  private errorsField: Array<string> = [];
  private validationFields: any = {};
  private errorLog: string;

  constructor(private data: ServerDataService) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new Floor();
    }
    this.site = this.site || new Site();
    this.maps = this.maps || [];

    this.model.idsite = this.site.idsite;
  }

  public submit() {
    this.errorLog = '';
    this.model.map = this.getPropertiesMap(this.model.map, true);
    if (this.validateFields()) {
      this.data.floorNew(this.model)
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
      this.data.floorUpdate(this.model)
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
    this.model = new Floor();
  }

  public validateFields() {
    this.validationFields = {};
    const log = this.model.validate();
    log.errors.forEach(e => {
      this.validationFields[e] = `${e} is <strong>required</strong>`;
    });
    return log.status;
  }

  getPropertiesMap(map: Map, isFloor?: boolean): Map {
    if (map != null) {
      const props = document.querySelector('.floorForm .preview-svg-ghost svg-item img');
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
