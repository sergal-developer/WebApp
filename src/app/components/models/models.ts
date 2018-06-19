export class Company {
    public idcompany: number;
    public name: string;
    public idcountry: number;
    public sites?: Array<Site>;
    public countryName?: string;

    constructor() {
        this.name = null;
        this.idcountry = null;
    }

    public validate() {
        let h = new Helpers();
        let fields = ['name', 'idcountry'];
        return h.validateModel(this, fields);
    }
}

export class Site {
    public idsite: number;
    public key: string;
    public name: string;
    public idcountry: number;
    public idcompany: number;
    public geo?: any;
    public stats?: Array<any>;
    public floors?: Array<Floor>;
    public typeDevices?: Array<string>;
    public countryName?: string;

    constructor() {
        this.key = null;
        this.name = null;
        this.idcountry = null;
        this.idcompany = null;
    }

    public validate() {
        let h = new Helpers();
        let fields = ['key', 'name', 'idcountry', 'idcompany'];
        return h.validateModel(this, fields);
    }
}

export class Floor {
    public idfloor: number;
    public name: string;
    public idsite: number;
    public active: boolean;
    public rooms?: Array<Room>;
    public map: Map;

    constructor() {
        this.name = null;
        this.idsite = null;
        this.active = true;
        this.map = new Map();
    }

    public validate() {
        let h = new Helpers();
        let fields = ['name', 'idsite', 'active'];
        let floor = h.validateModel(this, fields);
        let maps = this.map.validate();
        let response = h.mergeValidators([floor, maps]);
        return response;
    }
}

export class Room {
    public idroom: number;
    public name: string;
    public map: Map;
    public active: boolean;
    public idfloor: number;
    public devices?: Array<Device>;

    constructor() {
        this.name = null;
        this.active = true;
        this.idfloor = null;
        this.map = new Map();
    }

    public validate() {
        let h = new Helpers();
        let fields = ['name', 'active', 'idfloor'];
        let rooms = h.validateModel(this, fields);
        let maps = this.map.validate();
        let response = h.mergeValidators([rooms, maps]);
        return response;
    }
}

export class Device {
    public iddevice: number;
    public name: string;
    public idtype: number;
    public active: boolean;
    public idroom: number;
    public topic: string;
    public idstatus: DeviceStatus;
    public ip: string;
    public port: number;
    public mapping: Mapping;
    public value?: any;
    public deviceType?: DeviceType;
    public historyValues?: Array<any>;

    constructor() {
        this.name = null;
        this.idtype = null;
        this.active = true;
        this.idroom = null;
        this.topic = null;
        this.idstatus = null;
        this.ip = null;
        this.port = null;
        this.mapping = new Mapping();
    }

    public validate() {
        let h = new Helpers();
        let fields = ['name', 'idtype', 'active', 'idroom', 'topic', 'idstatus', 'ip', 'port'];
        let device = h.validateModel(this, fields);
        let mapping = this.mapping.validate();
        let response = h.mergeValidators([device, mapping]);
        return response;
    }
}

export class DeviceType {
    public iddevicetype: number;
    public type: string;
    public prefix: string;
    public color: string;

    constructor() {
        this.type = null;
        this.prefix = null;
        this.color = null;
    }

    public validate() {
        let h = new Helpers();
        let fields = ['type', 'prefix', 'color'];
        return h.validateModel(this, fields);
    }
}

export class Coordinates {
    public lat: number;
    public lng: number;

    constructor() {}
}

export class Position {
    public x: number;
    public y: number;

    constructor() {}
}

export class Map {
    public name: string;
    public url: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public disabled: boolean;

    constructor() {
        this.name = null;
        this.url = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.disabled = false;
    }

    public validate() {
        let h = new Helpers();
        let fields = ['name', 'url', 'width', 'height', 'disabled'];
        return h.validateModel(this, fields);
    }
}

export class Mapping {
    public x: number;
    public y: number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    public validate() {
        let h = new Helpers();
        let fields: Array<string> = [];
        return h.validateModel(this, fields);
    }
}

export class Country {
    public idcountry: number;
    public name: string;
    public code: string;
    public languages: Array<string>;

    constructor() {
        this.name = null;
        this.code = null;
        this.languages = [];
    }

    public validate() {
        let h = new Helpers();
        let fields = ['name', 'code'];
        return h.validateModel(this, fields);
    }
}

export class UserInformation {
    public globerId: Number;
        public givenName: string;
        public middleName: string;
        public familyName: string;
        public globerName?: Array<string>;
        public gender?: string;
        public username: string;
        public seniority?: string;
        public position?: string;
        public email: string;
        public picture?: string;
        public phone?: string;
        public internal?: string;
        public hd?: string;
        public entryDate?: string;
        public location: Number;
        public roles: Array<any>;
        public hash: Number;
        public googleId?: string;
        public gplusLink?: string;
        public sitesView?: Array<number>;

    constructor() {
        this.givenName = null;
        this.middleName = null;
        this.familyName = null;
        this.username = null;
        this.email = null;
        this.hd = null;
        this.location = null;
        this.roles = [];
        this.sitesView = [];
    }

        public validate() {
            let h = new Helpers();
            let fields = ['givenName',
                        'middleName',
                        'familyName',
                        'username',
                        'email',
                        'hd',
                        'location',
                        'roles'];

            return h.validateModel(this, fields);
        }
}

export class User {
    public iduser?: number;
    public authenticated?: Boolean;
    public token?: string;
    public code?: string;
    public userInformation: UserInformation;

    constructor() {
        this.token = null;
        this.userInformation = new UserInformation();
    }

    public validate() {
        let h = new Helpers();
        let fields = ['token'];
        let userFields = h.validateModel(this, fields);
        let userInfoFields = this.userInformation.validate();
        let response = h.mergeValidators([userFields, userInfoFields]);
        return response;
    }
}

export class Role {
    public idrole: number;
    public name: string;

    constructor() {
        this.name = null;
    }

    public validate() {
        let h = new Helpers();
        let fields = ['name'];
        return h.validateModel(this, fields);
    }
}

export class File {
    public idfile: number;
    public key: string;
    public name: string;
    public folder: string;
    public path: string;

    constructor() {
        this.key = null;
        this.name = null;
        this.folder = null;
        this.path = null;
    }

    public validate() {
        let h = new Helpers();
        let fields = ['key', 'name', 'folder', 'path'];
        return h.validateModel(this, fields);
    }
}

export class NotificationEntity {
    public idnotification: number;
    public description?: string;
    public iduser: number;
    public user?: User;
    public idassigneduser?: number;
    public assigneduser?: User;
    public iddevice: number;
    public device: Device;
    public idsite: number;
    public site: Site;
    public floor: Floor;
    public room: Room;
    public type: NotificationType;
    public typeName?: string;
    public state: NotificationState;
    public stateName?: string;

    constructor() {
        this.iduser = null;
        this.iddevice = null;
        this.idsite = null;
        this.type = null;
        this.state = null;
    }

    public validate() {
        let h = new Helpers();
        let fields = ['iduser', 'iddevice', 'idsite', 'type', 'state'];
        return h.validateModel(this, fields);
    }
}

export enum NotificationState {
    PENDING = 1,
    PROGRESS,
    HOLD,
    COMPLETED
}

export enum NotificationType {
    INSTALLATION = 1,
    MAINTENANCE,
    UNINSTALLATION
}

export enum RoleType {
    ROOT,
    ADMIN,
    SITEADMIN,
    FACILITIES,
    TECHNICAL,
    REPORTER,
}

export enum DeviceStatus {
    NEW = 1,
    NOTAVAILABLE,
    DISCONNECTED,
    CONNECTED,
    INMAINTENANCE
}

class Helpers {
    constructor() {}
    public validateModel(model: any, fields: Array<string>): { status: boolean, errors: Array<any> } {
        let errors: Array<any> = [];
        let valid = true;

        fields.forEach(f => {
            if (model[f] === undefined || model[f] == null || model[f] === '') {
                errors.push(f);
            }
        });

        valid = errors.length <= 0;
        return { status: valid, errors: errors };
    }

    public mergeValidators(collection: Array<any>): { status: boolean, errors: Array<any> } {
        let status = false;
        let errors: Array<any> = [];
        let statusCollection: Array<any> = [];
        let response: { status: boolean, errors: Array<any> };

        collection.forEach(item => {
            statusCollection.push(item.status);
            item.errors.forEach((error: any) => { errors.push(error); });
        });

        status = statusCollection.reduce(function(a, b) { return a && b; });
        response = { status: status, errors: errors };
        return response;
    }
}
