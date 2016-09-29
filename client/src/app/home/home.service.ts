import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HomeService {
    public cachedData = null;
    constructor(private http: Http) {
    }

    getAllTeams(){
        return this.http.get('http://localhost:3000/teams')
        .map(res => {
            return res.json();
        });
    }

    search(queryString: string) {
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('search', queryString);
        search.set('format', 'json');

        console.log(queryString);

        return this.http.get(`http://localhost:3000/teams/search/${queryString}`)
            .map(res => res.json());
    }
}
