import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutlet } from '@angular/router';

import { applicationRouting } from './app.routing';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { HomeCardComponent } from './home/home_card/homecard.component';
import { TeamComponent } from './team/team.component';

import { HomeService } from './home/home.service';
import { TeamService } from './team/team.service';
import { ProfileService } from './shared';

@NgModule({
  declarations: [
    AppComponent, ProfileComponent, HomeComponent, HomeCardComponent, TeamComponent
  ],
  imports: [
    applicationRouting,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ProfileService,
    HomeService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
