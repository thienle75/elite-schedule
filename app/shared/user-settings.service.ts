import { Injectable } from '@angular/core';
import { Events, LocalStorage, SqlStorage, Storage } from 'ionic-angular';
import * as _ from 'lodash';

@Injectable()
export class UserSettings {
    storage = new Storage(SqlStorage);

    constructor(private events: Events) { }

    favoriteTeam(team, tournamentId, tournamentName){
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        this.storage.set(team.id, JSON.stringify(item));
        this.events.publish('favorites:changed');
    }

    unfavoriteTeam(team){
        this.storage.remove(team.id);
        this.events.publish('favorites:changed');
    }

    isFavoriteTeam(teamId){
        return this.storage.get(teamId).then(value => value ? true : false);
    }

    getAllFavorites(){
        // let items = [];
        // _.forIn(window.localStorage, (v, k) => {
        //     items.push(JSON.parse(v));
        // });
        // return items.length ? items : null; 
        return this.storage.query('SELECT * FROM kv').then(data => {
            console.log(data);
            let results = [];
            for (var i = 0; i < data.res.rows.length; i++){
                results.push(JSON.parse(data.res.rows.item(i).value));
            }
            return results;
        });
    }
}