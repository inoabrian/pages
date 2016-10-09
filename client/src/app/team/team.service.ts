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
export class TeamService {
    public cachedData = null;
    constructor(private http: Http) {
    }

    getTeamByID(teamID: string) {
        return this.http.get(`http://localhost:3000/teams/${teamID}`)
        .map(res => {
            return res.json();
        });
    }
}
