import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage, StandingsPage, TeamDetailPage } from '../pages';

@Component({
  templateUrl: 'build/pages/team-home/team-home.page.html',
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(private nav: NavController, private navParams: NavParams) {
    this.team =  this.navParams.data; 
  }

  goHome(){
    //this.nav.push(MyTeamsPage);
    this.nav.popToRoot();
  }
}
