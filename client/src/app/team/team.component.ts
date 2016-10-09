import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamService } from './team.service';
import { Team } from './team.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team: Team;
  loading: boolean = true;

  constructor(
    private _tService: TeamService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this._tService.getTeamByID(id)
        .subscribe(team => {
          this.loading = false;
          this.team = team;
        });
    });
  }

}
