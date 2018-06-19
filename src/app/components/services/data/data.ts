import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../http/http';
import { Role, RoleType, User, UserInformation, Country, Company, DeviceType, Site, Floor, Room, Device, File, NotificationEntity } from '../../models/models';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';

const enpoints = {
    companies: '/companies',
    countries: '/countries',
    devices: '/devices',
    'device-types': '/device-types',
    files: '/files',
    floors: '/floors',
    roles: '/roles',
    rooms: '/rooms',
    sites: '/sites',
    users: '/users',
    notifications: '/notifications',
};

@Injectable()
export class ServerDataService {
    constructor(private http: HttpHelper) {}

    // #region Countries
    public countries(query?: object) {
        let url = enpoints.countries;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public countryNew(data: Country) {
        let url = enpoints.countries;
        return this.http.POST(url, data);
    }

    public countryUpdate(data: Country) {
        let url = enpoints.countries;
        let query = { idcountry: data.idcountry };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public countryDelete(data: Country) {
        let url = enpoints.countries;
        let query = { idcountry: data.idcountry };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }

    public installCountriesDefault() {
        return new Promise((resolve, reject) => {
            let url = enpoints.countries;
            let defaults = [
                { name: 'Afghanistan', code: 'AF'},
                { name: 'Åland Islands', code: 'AX'},
                { name: 'Albania', code: 'AL'},
                { name: 'Algeria', code: 'DZ'},
                { name: 'American Samoa', code: 'AS'},
                { name: 'AndorrA', code: 'AD'},
                { name: 'Angola', code: 'AO'},
                { name: 'Anguilla', code: 'AI'},
                { name: 'Antarctica', code: 'AQ'},
                { name: 'Antigua and Barbuda', code: 'AG' },
                { name: 'Argentina', code: 'AR' },
                { name: 'Armenia', code: 'AM' },
                { name: 'Aruba', code: 'AW' },
                { name: 'Australia', code: 'AU' },
                { name: 'Austria', code: 'AT' },
                { name: 'Azerbaijan', code: 'AZ' },
                { name: 'Bahamas', code: 'BS' },
                { name: 'Bahrain', code: 'BH' },
                { name: 'Bangladesh', code: 'BD' },
                { name: 'Barbados', code: 'BB' },
                { name: 'Belarus', code: 'BY' },
                { name: 'Belgium', code: 'BE' },
                { name: 'Belize', code: 'BZ' },
                { name: 'Benin', code: 'BJ' },
                { name: 'Bermuda', code: 'BM' },
                { name: 'Bhutan', code: 'BT' },
                { name: 'Bolivia', code: 'BO' },
                { name: 'Bosnia and Herzegovina', code: 'BA' },
                { name: 'Botswana', code: 'BW' },
                { name: 'Bouvet Island', code: 'BV' },
                { name: 'Brazil', code: 'BR' },
                { name: 'British Indian Ocean Territory', code: 'IO' },
                { name: 'Brunei Darussalam', code: 'BN' },
                { name: 'Bulgaria', code: 'BG' },
                { name: 'Burkina Faso', code: 'BF' },
                { name: 'Burundi', code: 'BI' },
                { name: 'Cambodia', code: 'KH' },
                { name: 'Cameroon', code: 'CM' },
                { name: 'Canada', code: 'CA' },
                { name: 'Cape Verde', code: 'CV' },
                { name: 'Cayman Islands', code: 'KY' },
                { name: 'Central African Republic', code: 'CF' },
                { name: 'Chad', code: 'TD' },
                { name: 'Chile', code: 'CL' },
                { name: 'China', code: 'CN' },
                { name: 'Christmas Island', code: 'CX' },
                { name: 'Cocos (Keeling) Islands', code: 'CC' },
                { name: 'Colombia', code: 'CO' },
                { name: 'Comoros', code: 'KM' },
                { name: 'Congo', code: 'CG' },
                { name: 'Congo, The Democratic Republic of the', code: 'CD' },
                { name: 'Cook Islands', code: 'CK' },
                { name: 'Costa Rica', code: 'CR' },
                { name: 'Cote D\'Ivoire', code: 'CI' },
                { name: 'Croatia', code: 'HR' },
                { name: 'Cuba', code: 'CU' },
                { name: 'Cyprus', code: 'CY' },
                { name: 'Czech Republic', code: 'CZ' },
                { name: 'Denmark', code: 'DK' },
                { name: 'Djibouti', code: 'DJ' },
                { name: 'Dominica', code: 'DM' },
                { name: 'Dominican Republic', code: 'DO' },
                { name: 'Ecuador', code: 'EC' },
                { name: 'Egypt', code: 'EG' },
                { name: 'El Salvador', code: 'SV' },
                { name: 'Equatorial Guinea', code: 'GQ' },
                { name: 'Eritrea', code: 'ER' },
                { name: 'Estonia', code: 'EE' },
                { name: 'Ethiopia', code: 'ET' },
                { name: 'Falkland Islands (Malvinas)', code: 'FK' },
                { name: 'Faroe Islands', code: 'FO' },
                { name: 'Fiji', code: 'FJ' },
                { name: 'Finland', code: 'FI' },
                { name: 'France', code: 'FR' },
                { name: 'French Guiana', code: 'GF' },
                { name: 'Gabon', code: 'GA' },
                { name: 'Gambia', code: 'GM' },
                { name: 'Georgia', code: 'GE' },
                { name: 'Germany', code: 'DE' },
                { name: 'Ghana', code: 'GH' },
                { name: 'Gibraltar', code: 'GI' },
                { name: 'Greece', code: 'GR' },
                { name: 'India', code: 'IN' },
                { name: 'Indonesia', code: 'ID' },
                { name: 'Luxembourg', code: 'LU' },
                { name: 'Mexico', code: 'MX' },
                { name: 'Paraguay', code: 'PY' },
                { name: 'Peru', code: 'PE' },
                { name: 'Poland', code: 'PL' },
                { name: 'Portugal', code: 'PT' },
                { name: 'Puerto Rico', code: 'PR' },
                { name: 'Spain', code: 'ES' },
                { name: 'Thailand', code: 'TH' },
                { name: 'United Kingdom', code: 'GB' },
                { name: 'United States', code: 'US' },
                { name: 'United States Minor Outlying Islands', code: 'UM' },
                { name: 'Uruguay', code: 'UY' },
                { name: 'Venezuela', code: 'VE' }
            ];
            defaults.forEach(c => {
                this.http.POST(url, c)
                    .then(d => console.log(d))
                    .catch(e => console.log(e));
            });
            setInterval(() => {
                this.http.GET(url)
                    .then((d: Array<any>) => {
                        // tslint:disable-next-line:no-unused-expression
                        d.length === defaults.length;
                        resolve(true);
                    })
                    .catch(e => { reject(e); });
            }, 3000);
        });
    }
    // #endregion

    // #region Device Types
    public deviceTypes(query?: object) {
        let url = enpoints['device-types'];
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public deviceTypeNew(data: DeviceType) {
        let url = enpoints['device-types'];
        return this.http.POST(url, data);
    }

    public deviceTypeUpdate(data: DeviceType) {
        let url = enpoints['device-types'];
        let query = { iddevicetype: data.iddevicetype };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public deviceTypeDelete(data: DeviceType) {
        let url = enpoints['device-types'];
        let query = { iddevicetype: data.iddevicetype };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }

    public installDeviceTypesDefault() {
        return new Promise((resolve, reject) => {
            let url = enpoints['device-types'];
            let defaults = [
                { type: 'temperature', prefix: 'C°', color: '#eb925e', icon: 'pe-is-w-thermometer-3', limits: { max: 50, min: 1 }},
                { type: 'light', prefix: 'Lux', color: '#DEC4A1', icon: 'pe-is-w-sun-1', limits: { max: 100, min: 0 } },
                { type: 'humidity', prefix: '%', color: '#A9E1BF', icon: 'pe-is-w-drop-percentage', limits: { max: 100, min: 0 } },
                { type: 'preasure', prefix: '%', color: '#82B6C7', icon: 'pe-7s-expand1', limits: { max: 100, min: 0 } },
                { type: 'electricity', prefix: 'KWh', color: '#ded61d', icon: 'pe-is-w-thunderbolt-2', limits: { max: 100, min: 0 } },
                { type: 'infrared', prefix: 'IR', color: '#e06363', icon: 'pe-is-w-sun-2', limits: { max: 100, min: 0 } },
                { type: 'water', prefix: '%', color: '#138098', icon: 'pe-is-w-drops', limits: { max: 100, min: 10 } },
            ];

            defaults.forEach(c => {
                this.http.POST(url, c)
                    .then(d => console.log(d))
                    .catch(e => console.log(e));
            });
            setInterval(() => {
                this.http.GET(url)
                    .then((d: Array<any>) => {
                        // tslint:disable-next-line:no-unused-expression
                        d.length === defaults.length;
                        resolve(true);
                    })
                    .catch(e => { reject(e); });
            }, 2000);
        });
    }
    // #endregion

    // #region Roles
    public roles(query?: object) {
        let url = enpoints.roles;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public installRolesDefault() {
        return new Promise((resolve, reject) => {
            let url = enpoints.roles;
            let defaults = [ { name: 'ROOT' },
                { name: 'ADMIN' },
                { name: 'SITEADMIN' },
                { name: 'FACILITIES' },
                { name: 'TECHNICAL' },
                { name: 'REPORTER' }];
            defaults.forEach(c => {
                this.http.POST(url, c)
                    .then(d => console.log(d))
                    .catch(e => console.log(e));
            });
            setInterval(() => {
                this.http.GET(url)
                    .then((d: Array<any>) => {
                        // tslint:disable-next-line:no-unused-expression
                        d.length === defaults.length;
                        resolve(true);
                    })
                    .catch(e => { reject(e); });
            }, 2000);
        });
    }
    // #endregion

    // #region Users
    public users(query?: object) {
        let url = enpoints.users;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public userNew(data: User) {
        let url = enpoints.users;
        return this.http.POST(url, data);
    }

    public userUpdate(data: User) {
        let url = enpoints.users;
        let query = { iduser: data.iduser };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public userDelete(data: User) {
        let url = enpoints.users;
        let query = { iduser: data.iduser };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }

    public installUserDefault() {
        return new Promise((resolve, reject) => {
            let url = enpoints.users;
            let u = new User();
                u.token = 'root.alva';
                u.userInformation.globerId = 0;
                u.userInformation.username = 'root.alva';
                u.userInformation.givenName = 'Root';
                u.userInformation.middleName = 'Alva';
                u.userInformation.familyName = 'User';
                u.userInformation.globerName = [ u.userInformation.givenName, u.userInformation.middleName, u.userInformation.familyName ];
                u.userInformation.gender = 'undefined';
                u.userInformation.email = 'root.alva@globant.com';
                u.userInformation.hd = 'globant.com';
                u.userInformation.location = 86;
                u.userInformation.picture = '/app/resources/avatars/avatar2.png';
                u.userInformation.roles = [ { name: 'GLOBER' }, { name: RoleType[RoleType.ROOT] } ];

            let defaults = [u];
            defaults.forEach(c => {
                this.http.POST(url, c)
                    .then(d => console.log(d))
                    .catch(e => console.log(e));
            });
            setInterval(() => {
                this.http.GET(url)
                    .then((d: Array<any>) => {
                        // tslint:disable-next-line:no-unused-expression
                        d.length === defaults.length;
                        resolve(true);
                    })
                    .catch(e => { reject(e); });
            }, 1000);
        });
    }
    // #endregion

    // #region Companies
    public companies(query?: object) {
        let url = enpoints.companies;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public companyNew(data: Company) {
        let url = enpoints.companies;
        return this.http.POST(url, data);
    }

    public installCompanyDefault(name: string, idcountry: number) {
        return new Promise((resolve, reject) => {
            let url = enpoints.companies;
            let u = new Company();
                u.name = name;
                u.idcountry = idcountry;

            let defaults = [u];
            defaults.forEach(c => {
                this.http.POST(url, c)
                    .then(d => console.log(d))
                    .catch(e => console.log(e));
            });
            setInterval(() => {
                this.http.GET(url)
                    .then((d: Array<any>) => {
                        // tslint:disable-next-line:no-unused-expression
                        d.length === defaults.length;
                        resolve(true);
                    })
                    .catch(e => { reject(e); });
            }, 1000);
        });
    }
    // #endregion

    // #region Sites
    public sites(query?: object) {
        let url = enpoints.sites;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public siteNew(data: Site) {
        let url = enpoints.sites;
        return this.http.POST(url, data);
    }

    public siteUpdate(data: Site) {
        let url = enpoints.sites;
        let query = { idsite: data.idsite };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public siteDelete(data: Site) {
        let url = enpoints.sites;
        let query = { idsite: data.idsite };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }
    // #endregion

    // #region Floors
    public floors(query?: object) {
        let url = enpoints.floors;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public floorNew(data: Floor) {
        let url = enpoints.floors;
        return this.http.POST(url, data);
    }

    public floorUpdate(data: Floor) {
        let url = enpoints.floors;
        let query = { idfloor: data.idfloor };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public floorDelete(data: Floor) {
        let url = enpoints.floors;
        let query = { idfloor: data.idfloor };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }
    // #endregion

    // #region Rooms
    public rooms(query?: object) {
        let url = enpoints.rooms;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public roomNew(data: Room) {
        let url = enpoints.rooms;
        return this.http.POST(url, data);
    }

    public roomUpdate(data: Room) {
        let url = enpoints.rooms;
        let query = { idroom: data.idroom };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public roomDelete(data: Room) {
        let url = enpoints.rooms;
        let query = { idroom: data.idroom };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }
    // #endregion

    // #region Devices
    public devices(query?: object) {
        let url = enpoints.devices;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public deviceNew(data: Device) {
        let url = enpoints.devices;
        return this.http.POST(url, data);
    }

    public deviceUpdate(data: Device) {
        let url = enpoints.devices;
        let query = { iddevice: data.iddevice };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public deviceDelete(data: Device) {
        let url = enpoints.devices;
        let query = { iddevice: data.iddevice };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }
    // #endregion

    // #region files
    public files(query?: object) {
        let url = enpoints.files;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public fileNew(data: File) {
        let url = enpoints.files;
        return this.http.POST(url, data);
    }

    public fileUpdate(data: File) {
        let url = enpoints.files;
        let query = { idfile: data.idfile };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public fileDelete(data: File) {
        let url = enpoints.files;
        let query = { idfile: data.idfile };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }
    // #endregion

    // #region notifications
    public notifications(query?: object) {
        let url = enpoints.notifications;
        if (query) {
            url = this.http.urlSerializer(url, query);
        }
        return this.http.GET(url);
    }

    public notificationNew(data: NotificationEntity) {
        let url = enpoints.notifications;
        return this.http.POST(url, data);
    }

    public notificationUpdate(data: NotificationEntity) {
        let url = enpoints.notifications;
        let query = { idnotification: data.idnotification };
        url = this.http.urlSerializer(url, query);
        return this.http.PATCH(url, data);
    }

    public notificationDelete(data: NotificationEntity) {
        let url = enpoints.notifications;
        let query = { idnotification: data.idnotification };
        url = this.http.urlSerializer(url, query);
        return this.http.DELETE(url, data);
    }
    // #endregion
}
