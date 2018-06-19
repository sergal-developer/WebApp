import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServerDataService } from '../data/data';
import { Globals } from '../globals/globals';
import { CookieService } from 'ngx-cookie';
import { User, Role } from '../../models/models';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  private userName: string;

  constructor(private router: Router,
            private globals: Globals,
            private data: ServerDataService,
            private cookie: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canLoad(route: Route) {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  reset() {
    this.cookie.removeAll();
    this.globals.currentUser = null;
    this.globals.currentRole = null;
    this.userName = null;
    this.router.navigate(['']);
  }

  checkLogin(url: string) {
    return this.checkUser();
  }

  checkUser() {
    return this.getUserStored();
  }

  private getUserStored() {
    let validate = this.cookie.get('username');
    if ( validate ) {
      this.userName = this.cookie.get('username');
    //   this.autenticate();
    } else {
        this.reset();
    }
    return validate ? true : false;
  }

//   validate(url: string) {
//     this._authService.redirectUrl = url;
//     return this._authService.validateSession(url)
//       .map((logged) => {
//         if (logged) {
//           if (new Session().fill(this._authService.session).isAuthenticated()) {
//             return true;
//           }
//         } else {
//           return this.reset();
//         }
//       })
//       .catch(() => {
//         return this.reset();
//       });
//   }
}
