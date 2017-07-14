import { Component, ViewChild } from '@angular/core';
import { Events, ionicBootstrap, LoadingController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HTTP_PROVIDERS } from '@angular/http';
import { GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

import { MyTeamsPage, TeamHomePage, TournamentsPage } from './pages/pages';
import { EliteApi, UserSettings } from './shared/shared';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    EliteApi,
    UserSettings,
    HTTP_PROVIDERS,
    GOOGLE_MAPS_PROVIDERS
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  

  constructor(
    private events: Events,
    private loadingController: LoadingController,
    public platform: Platform,
    private eliteApi: EliteApi,
    private userSettings: UserSettings) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.refreshFavorites();

      this.events.subscribe('favorites:changed', () => this.refreshFavorites()); 
    });
  }

  refreshFavorites(){
    this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTeam(favorite){
    let loader = this.loadingController.create({
        content: 'Getting data...',
        dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }
}

ionicBootstrap(MyApp);
