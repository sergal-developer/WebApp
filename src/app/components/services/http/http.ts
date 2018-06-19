import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Configuration } from '../globals/config';
import 'rxjs/add/operator/map';
import { error } from 'util';

@Injectable()
export class HttpHelper {

    private actionUrl: string;
    constructor(private http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl;
    }

    private mapping( res: Response ) {
        return res.json();
    }

    private _request(method: METHODS, url: string, data?: any) {
        let uri = `${ this.actionUrl }${ url }`;
        return new Promise((resolve, reject) => {
            if ( method !== METHODS.GET && !data ) {
                console.error(`@data parameter is required for url:[${ uri }]`);
                reject(null);
            }
            try {
                switch (method) {

                    case METHODS.GET:
                        this.http.get( uri )
                            .map(this.mapping)
                            .subscribe(
                                result => { resolve(result); },
                                error => { reject(error); }
                            );
                    break;

                    case METHODS.POST:
                        this.http.post( uri, data )
                            .map(this.mapping)
                            .subscribe(
                                result => { resolve(result); },
                                error => { reject(error); }
                            );
                    break;

                    case METHODS.PATCH:
                        this.http.patch( uri, data )
                            .map(this.mapping)
                            .subscribe(
                                result => { resolve(result); },
                                error => { reject(error); }
                            );
                    break;

                    case METHODS.DELETE:
                        this.http.delete( uri, data )
                            .map(this.mapping)
                            .subscribe(
                                result => { resolve(result); },
                                error => { reject(error); }
                            );
                    break;

                    default:
                        reject(null);
                    break;

                }
            } catch (error) {
                console.error(`http invoke [${ url }] | ${ error}`);
            }
        });
    }

    public GET(url: string) {
        return this._request(METHODS.GET, url);
    }

    public POST(url: string, data: any) {
        return this._request(METHODS.POST, url, data);
    }

    public PATCH(url: string, data: any) {
        return this._request(METHODS.PATCH, url, data);
    }

    public DELETE(url: string, data: any) {
        return this._request(METHODS.DELETE, url, data);
    }

    public urlSerializer(url: string, params: object) {
        let currentParams = '?';
        Object.keys(params).forEach(key => {
            let value = params[key];
            if (value || value !== undefined && value !== null && value !== '') {
            currentParams += `${key}=${params[key]}&`;
            }
        });
        if (currentParams.charAt(currentParams.length - 1) === '&') {
            currentParams = currentParams.substr(0, currentParams.length - 1);
        }
        return params ? (url + currentParams) : url;
    }

}

export enum METHODS {
    GET,
    POST,
    PUT,
    DELETE,
    PATCH,
    REQUEST,
    HEAD,
    OPTIONS
  }
