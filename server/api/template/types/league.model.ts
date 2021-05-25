import Tournament from 'round-robin-tournament';
import { nanoid } from 'nanoid';
import sillyname from 'sillyname';
import { knuthShuffle } from 'knuth-shuffle';
import cloneDeep from 'clone-deep';
import { unevenPlayer } from '../../../player/unevenPlayer.model';

// move to backend
export default class League {
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
  rounds: any;
  standings: any;
  sortingPriority: Array<string>;

  constructor({
    userId,
    managing,
    name,
    teams,
    visibility = 'private',
    options: {
      winPoints,
      drawPoints,
      losePoints,
      rounds,
      knockout,
      fixedMatchday,
    },
  }) {
    this.sortStandings = this.sortStandings.bind(this);
    this.compareFunction = this.compareFunction.bind(this);
    this.setRounds = this.setRounds.bind(this);

    this.id = nanoid();
    this.type = 'league';
    this.managing = managing;
    this.name = name || sillyname();
    this.admins = [userId];
    this.owner = userId;
    this.visibility = visibility;
    this.adminAccessToken = nanoid();
    this.userAccessToken = nanoid();
    this.sortingPriority = ['points', 'wins', 'name'];
    this.options = {
      winPoints,
      drawPoints,
      losePoints,
      rounds,
      knockout,
      fixedMatchday,
      sortingPriority: this.sortingPriority,
    };
    let newTeams =
      teams.length % 2 ? [...teams, new unevenPlayer().player] : teams;
    newTeams = knuthShuffle(cloneDeep(newTeams));
    this.rounds = this.setRounds(newTeams);
    this.teams = cloneDeep(newTeams).map((team) => {
      team.form = [];
      team.wins = 0;
      team.draw = 0;
      team.lost = 0;
      team.score = [0, 0];
      return team;
    });
    this.standings = this.sortStandings();
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
      rounds: this.rounds,
      options: this.options,
      standings: this.standings,
    };
  }

  sortStandings() {
    const clonedTeams = cloneDeep(this.teams);
    return clonedTeams.sort(this.compareFunction);
  }

  compareFunction(a, b, i = 0) {
    const firstItem = a[this.sortingPriority[i]];
    const secondItem = b[this.sortingPriority[i]];

    if (this.sortingPriority.length < i) {
      return 0;
    }

    if (typeof firstItem === 'string') {
      return firstItem.localeCompare(secondItem);
    }

    const sort = firstItem - secondItem;
    if (sort !== 0) {
      return sort;
    }

    return this.compareFunction(a, b, i + 1);
  }

  setRounds(teams) {
    const tournament = new Tournament(teams);
    const rounds = tournament.matches;
    const newRounds = rounds.map((round, i) => {
      return {
        round: i,
        matches: round.map((match) => {
          return [
            ...match,
            {
              finished: false,
              touched: false,
              reviewedBy: null,
              wonBy: null,
              editHistory: [],
              id: nanoid(),
            },
          ];
        }),
      };
    });

    return newRounds;
  }
}
