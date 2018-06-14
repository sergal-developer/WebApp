import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../services/services.data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})

export class AboutComponent implements OnInit {

    constructor() { }
    // Properties
    public titleMenu: string;
    // Functions
    ngOnInit() { }
}
