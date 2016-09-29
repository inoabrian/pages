import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterOutlet } from '@angular/router';
import 'rxjs/RX';

import { ProfileService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private searchTeam: string = '';
  private searching: boolean = false;
  private teams: any = [];
  private user: any = {};

  constructor(private http: Http, private _pservice: ProfileService) {
  }

  ngOnInit() {
    if (this._pservice.cachedData !== null) {
      this.user = this._pservice.cachedData.user;
    }else {
      this._pservice.getUser('5afaa46f-59aa-4a84-968b-e2424af5290f');
    }
  }

  searchChanged(event){
    this.searchTeam = event;
    if(event === '') {
      this.searching = false;
      return;
    }
    this.searching = true;
    this.http.get('http://localhost:3000/teams')
    .map(res => {
      res.json();
    })
    .subscribe(data => {
      this.teams = data;
    })
  }
}
