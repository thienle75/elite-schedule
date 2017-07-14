import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { MyTeamsPage, TeamsPage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'build/pages/tournaments/tournaments.page.html',
})
export class TournamentsPage {

  tournaments: any;
  
  constructor(
      private nav: NavController, 
      private eliteApi: EliteApi,
      private loadingController: LoadingController) { }

  itemTapped($event, tourney){
    this.nav.push(TeamsPage, tourney); 
  }

  ionViewLoaded(){
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
      //spinner: 'dots'
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
    
  }

  
}
