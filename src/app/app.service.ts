import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AppGlobal {
    static domain = "https://domain.com/api/v1";
}

@Injectable()
export class AppService {

    constructor(private http: Http) { }

    httpGet(url, params, callback, error) {
        var authHeaders = new Headers();
        authHeaders.append('Authorization', "");
        this.http.get(url + this.encode(params), { headers: authHeaders }).subscribe(res => {
            var d = res.json();
            callback(d == null ? "[]" : d);
        }, err => {
            error(err);
        });
    }

    httpPost(url, params, callback, error) {
        var authHeaders = new Headers();
        authHeaders.append('Authorization', "");
        this.http.post(url, params, { headers: authHeaders }).subscribe(res => {
            callback(res.json() == null ? "[]" : res.json());
        }, err => {
            error(err);
        });
    }


    encode(params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length - 1);
        }
        return str == '?'?'':str;
    }

}
