import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'homecard',
  templateUrl: './homecard.component.html',
  styleUrls: ['./homecard.component.css']
})
export class HomeCardComponent implements OnInit {
  loading: boolean = true;
  teams: any = [{}, {}, {}, {}];
  size: any = {col6: false, col4: true};

  @Output() view = new EventEmitter();

  @Input() set team(team:)

  constructor() {
   
  }
}