import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from './card.interface';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'homecard',
  templateUrl: './homecard.component.html',
  styleUrls: ['./homecard.component.css']
})
export class HomeCardComponent implements OnInit {
  teams: any = [{}, {}, {}, {}];
  colClass: any = 'col-xs-4';

  @Output() view = new EventEmitter();

  @Input() set col(col: string) {
    if (col != null) {
      this.colClass = col;
    }
  }

  @Input() set team(teams: Team) {
    if (teams != null) {
      this.teams = teams;
    }
  }

  constructor(private router: Router) {

  }

  ngOnInit() {
    console.log('home card init.');
  }

  viewTeam(data) {
    this.router.navigate(['/team', data.id]);
  }
}
