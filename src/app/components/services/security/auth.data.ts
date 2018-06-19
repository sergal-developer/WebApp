import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../http/http';
import 'rxjs/add/operator/map';
import { Router, Routes } from '@angular/router';
import { ServerDataService } from '../../../components/services/data/data';
import { Globals } from '../../../components/services/globals/globals';
import { User, UserInformation, Role, RoleType } from '../../../components/models/models';
import { CookieService } from 'ngx-cookie';
import { resolve } from 'url';

const enpoints = {
    roles: '/roles',
    users: '/users',
};

@Injectable()
export class AuthData {
    constructor(private data: ServerDataService,
                private globals: Globals,
                private router: Router,
                private cookie: CookieService) { }

    public googleAuth() {}

    public fakeAuth(username: string) {
        return new Promise((resolve, reject) => {
            try {
                let query = { 'userInformation.username': username };
                this.data.users(query)
                .then((user: Array<User>) => {
                    if (user && user.length) {
                        this.saveUserSession(username);
                        resolve(user[0]);
                    } else {
                        resolve(null);
                    }
                })
                .catch(error => {
                    console.log(error);
                    resolve(null);
                });
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    public getToken() {
        return this.cookie.get('token');
    }

    public checkUserSession() {
        let session = this.getUserSession(this.cookie.get('token'));
        return session ? true : false;
    }

    public saveUserSession(token: string) {
        let tokenTemp = this.encript(token);
        this.cookie.put('token', tokenTemp);
    }

    public getUserSession(token?: string) {
        if (token) { return this.decrypt(token); } else { return null; }
    }

    public closeSession(redirect?: string) {
        this.cookie.removeAll();
        this.cookie.removeAll();
        this.globals.currentUser = null;
        this.globals.currentRole = null;
        if (redirect) {
            this.router.navigate([redirect]);
        }
    }

    public getUser() {
        return new Promise((resolve, reject) => {
            try {
                let token = this.getUserSession(this.cookie.get('token'));
                let query = { 'userInformation.username': token };
                this.data.users(query)
                    .then((user: Array<User>) => {
                        if (user && user.length) {
                            this.saveUserSession(token);
                            this.globals.currentUser = user[0];
                            this.globals.roles = [];
                            this.globals.currentRole = new Role();
                            this.data.roles()
                                .then((roles: Array<Role>) => {
                                    this.globals.roles = roles;
                                    this.globals.currentRole = this.getHidhgerRole(user[0].userInformation.roles);
                                    resolve(user[0]);
                                })
                                .catch(e => {
                                    console.log(e);
                                    resolve(null);
                                });
                        } else {
                            resolve(null);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        resolve(null);
                    });
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    private encript(text: string) {
        let response = btoa(text);
        return response;
    }

    private decrypt(text: string) {
        let response = atob(text);
        return response;
    }

    public getHidhgerRole(roles: Array<any>) {
        let rol: Role;
        for (let i = 0; i < roles.length; i++) {
            const r = roles[i];
            if (r.name === RoleType[RoleType.ROOT]) {
            rol = this.globals.roles.filter(d => { return d.name === r.name; })[0];
            break;
            } else if (r.name === RoleType[RoleType.ADMIN]) {
            rol = this.globals.roles.filter(d => { return d.name === r.name; })[0];
            break;
            } else if (r.name === RoleType[RoleType.SITEADMIN]) {
            rol = this.globals.roles.filter(d => { return d.name === r.name; })[0];
            break;
            } else if (r.name === RoleType[RoleType.FACILITIES]) {
            rol = this.globals.roles.filter(d => { return d.name === r.name; })[0];
            break;
            } else if (r.name === RoleType[RoleType.TECHNICAL]) {
            rol = this.globals.roles.filter(d => { return d.name === r.name; })[0];
            break;
            } else if (r.name === RoleType[RoleType.REPORTER]) {
            rol = this.globals.roles.filter(d => { return d.name === r.name; })[0];
            break;
            }
        }
        return rol;
    }
}
