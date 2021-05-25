import { nanoid } from 'nanoid';
import sillyname from 'sillyname';
import { unevenPlayer } from '../../../player/unevenPlayer.model';

export default class Tournament {
  id: string;
  type: string;
  managing: string;
  name: string;
  admins: Array<string>;
  owner: string;
  visibility: string;
  adminAccessToken: string;
  userAccessToken: string;
  options: Object;
  teams: any;
  matches: Array<Array<Object>>;

  constructor({
    userId,
    managing,
    name,
    teams,
    visibility = 'private',
    options: {  },
  }) {
    this.id = nanoid();
    this.type = 'tournament';
    this.managing = managing;
    this.name = name || sillyname();
    this.admins = [userId];
    this.owner = userId;
    this.visibility = visibility;
    this.adminAccessToken = nanoid();
    this.userAccessToken = nanoid();
    this.options = {
    };
    this.teams = teams.length % 2 ? [...teams, unevenPlayer] : teams;
    // const tournament = new Tournament(this.teams);
    // this.matches = tournament.matches;
    // console.log('NEW LEAGE', this);
  }

  get fullInfo() {
    return {
      id: this.id,
      type: this.type,
      managing: this.managing,
      name: this.name,
      admins: this.admins,
      owner: this.owner,
      visibility: this.visibility,
      userAccessToken: this.userAccessToken,
      adminAccessToken: this.adminAccessToken,
      teams: this.teams,
      matches: this.matches,
      options: this.options,
    };
  }
  
}
