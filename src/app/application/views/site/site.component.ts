import { Component, OnInit, ViewChild, Renderer, HostListener, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../components/services/services.data';
import { Company, Site, Floor, Room, Device, Map, Country, File } from '../../../components/models/models';
// import { FileUploader, FileItem } from 'ng2-file-upload';
import { Globals } from '../../../components/services/globals/globals';
import { NgClass } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../../../components/services/window/window';
import { ServerDataService } from '../../../components/services/data/data';


@Component({
  // tslint:disable-next-line:component-selector
selector: 'site',
  templateUrl: './site.html',
  styleUrls: ['./site.scss']
})

export class SiteComponent implements OnInit {

  public siteKey: String;
  public site: Site;
  public floors: Array<Floor>;
  public rooms: Array<Room>;
  public devices: Array<Device>;
  public maps: Array<Map>;

  public panelControl = {
    show: false,
    title: 'New User',
    subtitle: '',
    type: 'panel-float right',
    size: 'small'
  };
  private showFormFloor =  false;
  private showFormRoom =  false;
  private dataLoading = false;

  // models
  public floorModelTemp: Floor = new Floor();
  public roomModelTemp: Room = new Room();

  public floorPanelOpen = false;
  public roomPanelOpen = false;
  public roomPropertiesOpen = false;

  public currentFloor: Floor;
  public currentRooms: Array<Room>;
  public currentRoom: Room;

  // public uploader: FileUploader = new FileUploader({ url: this._dataService.url('upload') });
  public mapFiles: Array<any>;
  public navIsFixed: boolean;
  private submitRuning = false;
  public mapBlocked: boolean;
  public bMouseDragging = false;
  public nMouseOffsetX = 0;
  public nMouseOffsetY = 0;
  public currentElement = '';

  constructor(private globals: Globals,
    private data: ServerDataService,
    private _dataService: DataService,
    private route: ActivatedRoute,
    private _router: Router,
    private renderer: Renderer) {

    this.siteKey = route.snapshot.params['site'];
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.globals.title = 'Site';
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  // #region DataSources
  getSite(next?: any) {
    let query = { key: this.siteKey };
    this.data.sites(query)
      .then((d: Array<Site>) => {
        if (d.length) {
          d = d.map((s: Site) => {
            let country = this.globals.countries.filter(c => { return c.idcountry === s.idcountry; })[0];
            s.countryName = country.name;
            return s;
          });
          this.site = d[0];
          if (next) { next(d); }
        } else {
          if (next) { next([]); }
        }
      })
      .catch(e => { console.log(e); if (next) { next(null); }});
  }

  getFloors(next?: any) {
    let query = { idsite: this.site.idsite };
    this.data.floors(query)
      .then((d: Array<Floor>) => {
        if (d.length) {
          this.floors = d;
          if (next) { next(d); }
        } else {
          if (next) { next([]); }
        }
      })
      .catch(e => { console.log(e); if (next) { next(null); } });
  }

  getRooms(floor: Floor, next?: any) {
    let query = { idfloor: floor.idfloor };
    this.data.rooms(query)
      .then((d: Array<Room>) => {
        if (d.length) {
          floor.rooms = d;
          if (next) { next(d); }
        } else {
          if (next) { next([]); }
        }
      })
      .catch(e => { console.log(e); if (next) { next(null); } });
  }

  getDevices(room: Room, next?: any) {
    let query = { idroom: room.idroom };
    this.data.devices(query)
      .then((d: Array<Device>) => {
        if (d.length) {
          room.devices = d;
          if (next) { next(d); }
        } else {
          if (next) { next([]); }
        }
      })
      .catch(e => { console.log(e); if (next) { next(null); }});
  }

  getFiles(next?: any) {
    let query = { key: this.siteKey };
    this.data.files(query)
      .then((d: Array<any>) => {
        if (d.length) {
          d = d.map((f: any) => {
            let map = new Map();
                map.disabled = false;
                map.height = map.width = map.x = map.y = 0;
                map.url = `${ this.globals.pathMaps }${ f.folder }/${ f.name }`;
                map['name'] = f.name;
            return map;
          });
          this.maps = d;
          if (next) { next(d); }
        } else {
          if (next) { next([]); }
        }
      })
      .catch(e => { console.log(e); if (next) { next(null); }});
  }

  loadData() {
    this.currentFloor = null;
    this.currentRoom = null;
    this.dataLoading = false;
    this.getSite((site: Site) => {
      this.getFloors((floors: Array<Floor>) => {
        if (floors.length) {
          this.site.floors = floors;
          floors.forEach((f: Floor) => {
            this.getRooms(f, ((rooms: Array<Room>) => {
              if (rooms.length) {
                rooms.forEach((r: Room) => {
                  this.getDevices(r, (devices: Array<Device>) => {
                    r.devices = devices;
                    this.updateTitle();
                    this.showRooms(f);
                  });
                });
              } else { this.dataLoading = true; this.updateTitle(); this.showRooms(f); }
            }));
          });
        } else { this.dataLoading = true; this.updateTitle(); }
      });
    });
    this.getFiles();
  }
  // #endregion
  updateTitle() {
    this.globals.title = `Site ${this.site.name} | ${this.site.countryName}`;
  }

  // #region Open Modals
  doOpenPanel(event: any) {
    this.panelControl.show = true;
  }

  doClosePanel(event: any) {
    this.panelControl.show = false;
    this.resetPanel();
  }

  resetPanel() {
    this.showFormFloor = false;
    this.showFormRoom = false;
  }

  openFloorPanel(event: any) {
    this.panelControl.title = 'New';
    this.panelControl.subtitle = 'Floor';
    this.showFormFloor = true;
    this.doOpenPanel(event);
  }

  openRoomPanel(event: any) {
    this.panelControl.title = 'New';
    this.panelControl.subtitle = 'Room';
    this.showFormRoom = true;
    this.doOpenPanel(event);
  }

  onSubmitForm(event: any) {
    if (event) {
      this.doClosePanel(event);
      this.loadData();
    }
  }
  // #endregion

  showRooms(floor: any) {
    this.currentFloor = null;
    this.currentFloor = floor;
    this.currentRooms = null;
    this.roomPropertiesOpen = false;
    if (floor.rooms && floor.rooms.length) {
      this.currentRooms = floor.rooms;
    }
  }

  validate(object: object) {
    let errors = [];
    for (const k in object) {
      if (object[k] === undefined ||
        object[k] === null ||
        object[k] === '' ||
        object[k] === 0) {
        errors.push(k);
      }
    }
    if (errors.length > 0) {
      console.error('Errors: ', errors);
      return false;
    }
    return true;
  }

  submitNewRoom() {
    this.roomModelTemp.map = this.getPropertiesMap(this.roomModelTemp.map);
    if (this.validate(this.roomModelTemp)) {
      if (!this.submitRuning) {
        this.submitRuning = true;
        this._dataService.createData('/rooms', this.roomModelTemp).subscribe(res => {
          this.loadData();
          this.closePanelRoom();
          this.submitRuning = false;
        });
      }
    }
  }

  submitNewFloor() {
    this.floorModelTemp.map = this.getPropertiesMap(this.floorModelTemp.map);
    if (this.validate(this.floorModelTemp)) {
      this._dataService.createData('/floors', this.floorModelTemp).subscribe(res => {
        this.loadData();
        this.closePanelFloor();
      });
    }
  }

  openPanelFloor() {
    this.floorPanelOpen = true;
    this.floorModelTemp.idsite = this.site.idsite;
  }

  closePanelFloor() {
    this.floorPanelOpen = false;
  }

  openPanelRoom() {
    if (this.currentFloor) {
      this.roomPanelOpen = true;
      this.roomModelTemp.idfloor = this.currentFloor.idfloor;
    }
  }
  closePanelRoom() {
    this.roomPanelOpen = false;
  }

  toggleRoomProperties() {
    if (this.roomPropertiesOpen) {
      this.roomPropertiesOpen = false;
    } else {
      this.roomPropertiesOpen = true;
    }
  }

  loadRoomProperties(room: any) {
    this.currentRoom = null;
    this.currentRoom = room;

    if (!this.roomPropertiesOpen) {
      this.toggleRoomProperties();
    }
  }

  initComponentMap() {
    const maps = document.querySelectorAll('.map-viewer.floor use');
    [].forEach.call(maps, (element: Element) => {
      element.addEventListener('mousedown', (e: any) => { this.mouseDown(e, element.id); });
      element.addEventListener('mouseup', (e: any) => { this.mouseUp(e); });
      element.addEventListener('mousemove', (e: any) => { this.mouseMove(e, element.id); });
    });
  }


  mouseDown(e: MouseEvent, id: string) {
    if (!this.bMouseDragging && this.mapBlocked) {
      this.bMouseDragging = true;
      let p = { x: e.clientX, y: e.clientY };
      let element = document.querySelector(`#${id}`);
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
      let p = { x: e.clientX, y: e.clientY };
      let element = document.querySelector(`#${id}`);
      if (element && this.currentElement === id && !element.getAttribute('disabled')) {
        let position = { x: p.x - this.nMouseOffsetX, y: p.y - this.nMouseOffsetY };
        this.evalueLimit(element, position);
        element.setAttribute('x', `${p.x - this.nMouseOffsetX}`);
        element.setAttribute('y', `${p.y - this.nMouseOffsetY}`);
      }
    }
  }

  evalueLimit(element: any, position: any) {
    let canvas = document.querySelector('#map-container-component');

    element.getScreenCTM();
    let p = {
      xMin: 0,
      yMin: 0,
      xMax: canvas.clientWidth,
      yMax: canvas.clientHeight
    };
    let elem = { x: element.clientWidth, y: element.clientHeight };


    elem.x = element.clientWidth + position.x;
    elem.y = element.clientHeight + position.y;
    return true;
  }

  getPropertiesMap(map: Map, isFloor?: boolean): Map {
    if (map != null) {
      let props = document.querySelector('.preview-svg-ghost svg-item img');
      map.disabled = isFloor ? isFloor : false;
      map.width = props.clientWidth;
      map.height = props.clientHeight;
      map.x = 0;
      map.y = 0;
      return map;
    }
    return null;
  }

  unblockMap() {
    this.initComponentMap();
    this.mapBlocked = true;
  }

  saveChangesMap() {
    this.mapBlocked = false;
    // get all maps
    const maps = document.querySelectorAll('.map-viewer.floor use');
    // get info from each map
    [].forEach.call(maps, (elm: Element) => {
      let id = parseInt(elm.getAttribute('prop-id'), null);
      let map_x = parseInt(elm.getAttribute('x'), null);
      let map_y = parseInt(elm.getAttribute('y'), null);
      let room: Room = this.currentRooms.filter((r: Room) => {
        return r.idroom === id;
      })[0];
      if ( room && room.map.x !== map_x && room.map.y !== map_y) {
        room.map.x = map_x;
        room.map.y = map_y;
        this.updateRoom(room);
      }

    });
  }

  updateRoom(room: Room) {
    let data = { mapping: room.map };
    this._dataService.updateData(`/rooms?idroom=${ room.idroom }`, data).subscribe(res => {
      this.loadData();
    });
  }

  discardChangesMap() {
    this.mapBlocked = false;
    this.loadData();
  }
}
