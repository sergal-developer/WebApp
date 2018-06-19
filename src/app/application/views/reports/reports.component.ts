import { Component } from '@angular/core';
import { DataService } from '../../../components/services/services.data';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from '../../../components/services/globals/globals';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})

export class ReportsComponent {
  // Properties
  name = 'Reports.ts';
  constructor(private _dataService: DataService,
    private _router: Router,
    private globals: Globals) {
      this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      this.globals.title = 'Reports';
      }
      });
    }
    // Functions
}
