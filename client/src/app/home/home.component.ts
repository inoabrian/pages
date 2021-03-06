import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Subject } from 'rxjs/Subject';
import { HomeCardComponent } from './home_card/homecard.component';

import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  teams: any = [{}, {}, {}, {}];
  search$: Subject<string> = new Subject<string>();
  size: any = {col6: false, col4: true};
  colSize: string = 'col-lg-4 col-md-4 col-sm-12 col-xs-12';

  constructor(private _hservice: HomeService) {
    this._hservice.search(this.search$)
        .subscribe(data => {
          this.teams = data;
        });
  }

  ngOnInit() {
    this.setupSubscriptions();
  }

  searchTeams(queryString: string) {
    this.loading = true;
    this._hservice.search(this.search$)
    .subscribe(data => {
      this.teams = data;
      this.loading = false;
    });
  }

  setCol(size: number) {
    this.size[`col${size}`] = true;
    if (size === 6) {
      this.size.col4 = false;
      this.colSize =  'col-lg-6 col-md-6 col-sm-12 col-xs-12';
    }else {
      this.size.col6 = false;
      this.colSize =  'col-lg-4 col-md-4 col-sm-12 col-xs-12';
    }
  }

  setupSubscriptions(){
    if (this._hservice.cachedData !== null) {
      if (this._hservice.cachedData.teams !== undefined) {
        this.teams = this._hservice.cachedData.teams.sort((a, b) => { return a.teamName - b.teamName; });
        this.loading = false;
      }
    } else {
      this._hservice.getAllTeams()
        .subscribe(data => {
          this.teams = data.sort((a, b) => { return a.teamName - b.teamName; });
          this.loading = false;
        });
    }
  }

}
