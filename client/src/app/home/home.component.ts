import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Subject } from 'rxjs/Subject';
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

  constructor(private _hservice: HomeService) {
    this.search$.subscribe(query => this.searchTeams(query))
  }

  ngOnInit() {
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

  searchTeams(queryString: string) {
    this._hservice.search(queryString)
    .subscribe(data => {
      this.teams = data;
    });
  }

  setCol(size: number) {
    this.size[`col${size}`] = true;
    if (size === 6) {
      this.size.col4 = false;
    }else {
      this.size.col6 = false;
    }
  }

}
