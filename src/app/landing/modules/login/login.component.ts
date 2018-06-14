import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { DataService } from '../../../components/services/services.data';
// import { ServerDataService } from '../../../components/services/data/data';
// import { AuthData } from '../../../components/services/security/auth.data';
// import { Globals } from '../../../components/services/globals/globals';
// import { Router, Routes } from '@angular/router';
// import { User, UserInformation, Role } from '../../../components/models/models';
// import { CookieService } from 'ngx-cookie';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class LoginComponent implements OnInit {
    @Input() typePanel: string;
    // @Output() onClose: EventEmitter<any>;
    public userName: string;
    private showWarning: string;
    private waitMode: boolean;

    constructor(
      // private data: ServerDataService,
      // private authData: AuthData,
      // private globals: Globals,
      // private router: Router
    ) {
    }
    // Properties

    // Functions
    ngOnInit() {
      // this.checkUserSession();
    }

    public googleAuth() {
      console.log('Not available');
      // this.authData.googleAuth();
    }
    /*
    public fakeAuth() {
      this.waitMode = true;
      if(this.validate()) {
        this.authData.fakeAuth(this.userName)
        .then((u: User) => {
          if (u) {
            this.authData.getUser()
              .then((d: User) => {
                if (d) {
                  this.globals.currentUser = d;
                  this.router.navigate(['/app']);
                }
              })
              .catch(e => { console.log(e); });
          }
          this.waitMode = false;
        })
        .catch(err => {
          this.waitMode = false;
          console.log(err);
        });
      } else {
        this.showWarning = 'Please fill user name';
        this.waitMode = false;
      }
    }

    private validate() {
      this.showWarning = '';
      return !!this.userName;
    }

    private checkUserSession() {
      if (this.authData.checkUserSession()) {
        this.userName = this.authData.getUserSession(this.authData.getToken());
        this.fakeAuth();
      }
    }
    */
}
