import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Configuration } from './globals/config';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private actionUrl: string;

    constructor(private http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl;
    }

    public url(route: string) {
        return `${this.actionUrl}${route}`;
    }

    public getAll(model: string) {
        let uri = `${this.actionUrl}${model}`;
        return this.http.get(uri).map((res: Response) => { return res.json(); });
    }

    public createData(model: string, data: any) {
        return this.http.post(`${this.actionUrl}${model}`, data).map((res: Response) => { return res.json(); });
    }

    public updateData(model: string, data: any) {
        return this.http.patch(`${this.actionUrl}${model}`, data).map((res: Response) => { return res.json(); });
    }
}
