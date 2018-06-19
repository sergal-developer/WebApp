import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Globals } from '../components/services/globals/globals';
import { Country } from '../components/models/models';
import { ServerDataService } from '../components/services/data/data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})

export class LandingComponent implements OnInit {
    // Properties
    public titleMenu: string;
    public navIsFixed: Boolean = false;
    private showSupportPage: Boolean = false;

    public listMenus = [
      { url: '/#home', name: 'Home', icon: 'home' },
      { url: '/#how', name: 'How it works', icon: 'report' },
      { url: '/#watch', name: 'Watch everything', icon: 'support' },
      { url: '/#measure', name: 'Measure consumption', icon: 'login' }
    ];

    constructor(private data: ServerDataService,
                private globals: Globals) { }

    // Functions
    ngOnInit() {
      this.getCountries();
     }

    scrollChanged(event: any) {
      if (event >= 600) {
        this.navIsFixed = true;
      } else {
        this.navIsFixed = false;
      }
    }

    getCountries() {
      this.data.countries()
        .then((d: Array<any>) => {
          if (!d.length) { this.showSupportPage = true; }
        })
        .catch(e => console.error(e));
    }
}
