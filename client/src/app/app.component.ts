import { Component } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterOutlet } from '@angular/router';
import 'rxjs/RX';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private searchTeam: string = '';
  private searching: boolean = false;
  private teams: any = [];

  constructor(private http: Http) {
    this.teams = [
      { 
        "createdDate": "2016-09-26T06:11:59.852Z", 
        "id": "2a16415d-7549-422e-a59a-2ebc71bae758", 
        "teamActive": true, 
        "teamBackgroundImage": "http://inoabrian.com/photo_1.jpg", 
        "teamMembers": ["5afaa46f-59aa-4a84-968b-e2424af5290f"], 
        "teamName": "Not - Telematics", 
        "teamProjects": ["SSP", "Autotel", "ORSA", "MTA"], 
        "teamTechStack": "" 
      }
    ];
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
