import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, group, animateChild } from '@angular/animations';
import { Router, Routes } from '@angular/router';
import { User, UserInformation, Role, RoleType, Country, Company, Site } from '../components/models/models';
import { ServerDataService } from '../components/services/data/data';
import { AuthData } from '../components/services/security/auth.data';
import { Globals } from '../components/services/globals/globals';

@Component({
  // tslint:disable-next-line:component-selector
  // tslint:disable-next-line:component-selector
selector: 'application',
  templateUrl: './application.html',
  styleUrls: ['./application.scss'],
  animations: [
    trigger('logoAnimation', [
      transition('* => *', [
        query('div', style({ transform: 'translateX(-100%)', opacity: 0})),
        query('div',
          stagger('100ms', [
            animate('600ms', style({ transform: 'translateX(0)', opacity: 1}))
        ]))
      ])
    ]),
    trigger('menuAnimation', [
      transition('* => *', [
        query('div', style({ transform: 'translate(0, -100%)', opacity: 0})),
        query('div',
          stagger('400ms', [
            animate('400ms', style({ transform: 'translate(0, 0)', opacity: 1}))
        ]))
      ])
    ]),

    trigger('routeAnimation', [
      transition('* => *', [
        group([
          query(':enter', [
            style({ opacity: 0 }),
            animate('0.5s', style({ opacity: 1 })),
            animateChild()
          ]),
          query(':leave', [
            animate('0.5s', style({ opacity: 0 })),
            animateChild()
          ])
        ])
      ]),
    ]),

    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width: '100%',
            transform: 'translateX(100%)',
            opacity: 1
          }),
          {optional: true}),
        // move page off screen right on leave
        query(':leave',
          animate('400ms ease',
            style({
              position: 'absolute',
              width: '100%',
              transform: 'translateX(-50%)',
              opacity: 0
            })
          ),
        {optional: true}),
        // move page in screen from left to right
        query(':enter',
          animate('400ms ease',
            style({
              opacity: 1,
              transform: 'translateX(0%)',
            })
          ),
        {optional: true}),
      ])
    ])

  ]
})
export class ApplicationComponent implements OnInit {
  public message: string;
  public menus = [
    { url: '/app', name: 'Home', icon: 'pe-7s-home', active: true },
    { url: '/app/reports', name: 'Reports', icon: 'pe-7s-graph1', active: true },
    { url: '/app/notifications', name: 'Notifications', icon: 'pe-7s-ticket', active: true },
    { url: '/app/settings', name: 'Settings', icon: 'pe-7s-settings', active: true }
  ];

  public loading: Boolean;
  public company: any;
  public title: any;
  private AppMode: Mode;

  constructor(
    private authData: AuthData,
    private data: ServerDataService,
    private globals: Globals,
    private router: Router) {
  }

  // Functions
  ngOnInit() {
    this.getUserSession();
    this.getCompany();
    this.getCountries();
  }

  getRouteAnimation(outlet: any) {
    return outlet.activatedRouteData.animation;
  }

  getUserSession() {
    if ( this.authData.checkUserSession() ) {
      this.authData.getUser().then((u: User) => {
        this.checkPermissions();
        this.setupPermissions();
      })
      .catch(e => { console.log(e); });
    } else {
      this.router.navigate(['/']);
    }
  }

  logOut() {
    this.authData.closeSession('/');
  }

  getCountries() {
    if (!this.globals.countries || !this.globals.countries.length) {
      this.data.countries()
      .then((c: Array<Country>) => {
        this.globals.countries = c;
      })
      .catch(e => console.log(e));
    }
  }

  getCompany() {
    if (!this.globals.currentCompany) {
      this.data.companies({name: 'Globant'})
        .then((company: Array<Company>) => {
          this.globals.currentCompany = company[0];
        })
        .catch(e => console.log(e));
    }
  }

  checkPermissions() {
    const OperationsRoles = ['ROOT', 'ADMIN'];
    const SiteAdministratorRoles = ['SITEADMIN'];
    const FacilitiesRoles = ['FACILITIES', 'TECHNICAL'];
    const ReportingRoles = ['REPORTER'];

    if (OperationsRoles.indexOf(this.globals.currentRole.name) !== -1) {
      this.AppMode = Mode.OPERATIONS;
      return;
    } else if (SiteAdministratorRoles.indexOf(this.globals.currentRole.name) !== -1) {
      this.AppMode = Mode.ADMINISTRATOR;
      return;
    } else if (FacilitiesRoles.indexOf(this.globals.currentRole.name) !== -1) {
      this.AppMode = Mode.FACILITIES;
      return;
    } else if (ReportingRoles.indexOf(this.globals.currentRole.name) !== -1) {
      this.AppMode = Mode.REPORTERS;
      return;
    }

  }

  setupPermissions() {
    switch (this.AppMode) {
      case Mode.OPERATIONS:
        this.menus = [
          { url: '/app', name: 'Home', icon: 'pe-7s-home', active: true },
          { url: '/app/reports', name: 'Reports', icon: 'pe-7s-graph1', active: true },
            { url: '/app/notifications', name: 'Notifications', icon: 'pe-7s-ticket', active: true },
          { url: '/app/settings', name: 'Settings', icon: 'pe-7s-settings', active: true }
        ];
        break;

      case Mode.ADMINISTRATOR:
        this.menus = [
          { url: '/app', name: 'Home', icon: 'pe-7s-home', active: true },
          { url: '/app/reports', name: 'Reports', icon: 'pe-7s-graph1', active: true }
        ];
        break;

      case Mode.FACILITIES:
        this.menus = [
          { url: '/app', name: 'Home', icon: 'pe-7s-home', active: true },
          { url: '/app/notifications', name: 'Notifications', icon: 'pe-7s-ticket', active: true },
        ];
        break;

      case Mode.REPORTERS:
        this.menus = [
          { url: '/app', name: 'Home', icon: 'pe-7s-home', active: true },
          { url: '/app/reports', name: 'Reports', icon: 'pe-7s-graph1', active: true }
        ];
        break;

      default:
        break;
    }
  }
}

enum Mode {
  OPERATIONS,
  ADMINISTRATOR,
  FACILITIES,
  REPORTERS
}
