import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    // search port in ./server/config/config.js
    public Server = 'http://localhost:3045';
    public ApiUrl = '';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
