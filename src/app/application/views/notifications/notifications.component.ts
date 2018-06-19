import { Component, OnInit } from '@angular/core';
import { ServerDataService } from '../../../components/services/data/data';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Site, Floor, Room, Device, Country, DeviceType, Role,
  NotificationEntity, NotificationState, NotificationType, User } from '../../../components/models/models';
import { Globals } from '../../../components/services/globals/globals';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'notifications',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})

export class NotificationsComponent implements OnInit {
   // Properties
   private dataLoading = false;
   filters = [
     { value: 0, text: 'All' },
     { value: 1, text: 'Installation Request' },
     { value: 2, text: 'Installed' },
     { value: 3, text: 'Maintenance Request' }
   ];
   currentDevice: Device;
   notifications: Array<NotificationEntity>;
   currentNotif: NotificationEntity;

  constructor(private data: ServerDataService,
                private globals: Globals,
                private _router: Router,
                private sanitizer: DomSanitizer) {

      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.globals.title = 'Notifications';
          }
      });
    }

    // Functions
    ngOnInit() {
      this.loadData();
    }

    loadData() {
      this.dataLoading = false;
      this.getNotifications((notifications: Array<NotificationEntity>) => {
        notifications.forEach(n => {
          this.getUser(n.iduser, (u: User) => {
            n.user = u;
          });
        });
      });
    }

    // #region Data Sources
    getNotifications(next?: any) {
      this.data.notifications()
        .then((d: Array<NotificationEntity>) => {
          if (d.length) {
            d = d.map(n => {
              n.typeName = NotificationType[n.type];
              n.stateName = NotificationState[n.state];
              return n;
            });
            this.notifications = d;
            if (next) { next(d); }
          } else {
            if (next) { next([]); }
          }
          console.log('this.notifications: ', this.notifications);
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }

    getDevice(id: number, next?: any) {
      const query = { iddevice: id };
      this.data.devices(query)
        .then((d: Array<Device>) => {
          if (d.length) {
            if (next) { next(d[0]); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }

    getFloor(id: number, next?: any) {
      const query = { idfloor: id };
      this.data.floors(query)
        .then((d: Array<Floor>) => {
          if (d.length) {
            if (next) { next(d[0]); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }

    getSite(id: number, next?: any) {
      const query = { idsite: id };
      this.data.sites(query)
        .then((d: Array<Site>) => {
          if (d.length) {
            if (next) { next(d[0]); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }

    getRoom(id: number, next?: any) {
      const query = { idroom: id };
      this.data.rooms(query)
        .then((d: Array<Room>) => {
          if (d.length) {
            if (next) { next(d[0]); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }

    getUser(id: number, next?: any) {
      const query = { iduser: id };
      this.data.users(query)
        .then((d: Array<User>) => {
          if (d.length) {
            if (next) { next(d[0]); }
          } else {
            if (next) { next([]); }
          }
        })
        .catch(e => { console.log(e); if (next) { next(null); } });
    }
    // #endregion

    getDetails(notification: NotificationEntity) {
      this.currentNotif = notification;
      this.getDevice(notification.iddevice, (d: Device) => {
        this.currentNotif.device = d;
        this.getRoom(d.idroom, (r: Room) => {
          this.currentNotif.room = r;
          this.getFloor(r.idfloor, (f: Floor) => {
            this.currentNotif.floor = f;
            this.getSite(f.idsite, (s: Site) => {
              this.currentNotif.site = s;
            });
          });
        });
      });
    }

    safeStyle(value: number) {
      const val = this.sanitizer.bypassSecurityTrustStyle(`${ value }px`);
      console.log('val: ', val);
      return val;
    }
    setPositionDevice(device: Device) {
      console.log('device: ', device);
      // return this.sanitizer.bypassSecurityTrustStyle(`left: ${device.mapping.x}px; top:${device.mapping.y}px;`);
      return this.sanitizer.bypassSecurityTrustStyle('left: 10px; top: 30px;');
    }
}
