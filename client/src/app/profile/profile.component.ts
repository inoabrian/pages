import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading: boolean = true;
  constructor(private _pservice: ProfileService) { }

  ngOnInit() {
    if (this._pservice.cachedData === null) {
      this._pservice.getUser('5afaa46f-59aa-4a84-968b-e2424af5290f');
    }
  }

}
