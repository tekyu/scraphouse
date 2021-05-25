import logger from '../../loaders/logger';
import LeagueModel from '../../api/template/types/league.schema';
import { IUserInputDTO } from '../../user/user.interface';
import League from './types/league.model';
export default class TemplateService {
  logger: any;
  constructor() {
    this.logger = logger;
    this.createTemplate = this.createTemplate.bind(this);
    this.getTemplate = this.getTemplate.bind(this);
    this.manageTemplate = this.manageTemplate.bind(this);
  }

  public async createTemplate(createTemplateInput: any): Promise<Object> {
    console.log('[service] createTemplate', createTemplateInput);
    try {
      const { type } = createTemplateInput;
      switch (type) {
        case 'league': {
          const leagueTemplate = new League(createTemplateInput);
          const leagueRecord = await LeagueModel.create(
            leagueTemplate.fullInfo
          );
          return leagueRecord.toObject();
        }
        case 'tournament': {
          console.log('tournament');
          return {};
        }
        default:
          return {};
      }
    } catch (e) {
      throw e;
    }
  }

  public async getTemplate(id: string): Promise<Object> {
    console.log('[service] createTemplate', id);
    try {
      const leagueRecord = await LeagueModel.findOne({ id: id }).exec();
      return leagueRecord ? leagueRecord.toObject() : null;
    } catch (e) {
      throw e;
    }
  }

  public async manageTemplate(data: any): Promise<Object> {
    if (data.type === 'league') {
      return this.manageLeague(data);
    }
  }

  private async manageLeague(data: any): Promise<Object> {
    try {
      const { templateId, match, userId } = data;
      const templateRecord = await LeagueModel.findOne({
        id: templateId,
      }).exec();
      console.log('templaterecord', templateRecord.sortStandings);
      // console.log('[service] manageTemplate', templateRecord);
      if (!templateRecord.admins.find((admin) => admin === userId)) {
        return { error: 401 };
      }

      // console.log(
      //   'round',
      //   match.round,
      //   templateRecord.rounds[match.round].matches.find(
      //     (match) => match[0].id === data.match.home.id
      //   )
      // );
      const foundMatchInRound = templateRecord.rounds[match.round].matches.find(
        (match) => match[0].id === data.match.home.id
      );

      const standingHomeTeam = templateRecord.standings.find(
        ({ id }) => id === foundMatchInRound[0].id
      );
      const standingAwayTeam = templateRecord.standings.find(
        ({ id }) => id === foundMatchInRound[1].id
      );
      console.log(
        'TEMPLATE',
        foundMatchInRound,
        'AWAY',
        standingAwayTeam,
        'HOME',
        standingHomeTeam
      );
      if (match.home.points > match.away.points) {
        standingHomeTeam.wins += 1;
        standingHomeTeam.points += templateRecord.options.winPoints;
        standingAwayTeam.lost += 1;
        standingAwayTeam.points += templateRecord.options.losePoints;

        foundMatchInRound[2].wonBy = match.home.id;
      } else if (match.home.points < match.away.points) {
        standingHomeTeam.lost += 1;
        standingHomeTeam.points += templateRecord.options.losePoints;
        standingAwayTeam.wins += 1;
        standingHomeTeam.points += templateRecord.options.winPoints;
        foundMatchInRound[2].wonBy = match.away.id;
      } else {
        standingHomeTeam.draw += 1;
        standingHomeTeam.points += templateRecord.options.drawPoints;
        standingAwayTeam.draw += 1;
        standingHomeTeam.points += templateRecord.options.drawPoints;
      }
      standingHomeTeam.score[0] += match.home.points;
      standingHomeTeam.score[1] += match.away.points;
      standingAwayTeam.score[0] += match.away.points;
      standingAwayTeam.score[1] += match.home.points;
      foundMatchInRound[0].points = match.home.points;
      foundMatchInRound[1].points = match.away.points;
      foundMatchInRound[2].finished = true;
      foundMatchInRound[2].touched = true;
      foundMatchInRound[2].reviewedBy = userId;
      foundMatchInRound[2].editHistory = data;
      templateRecord.sortStandings();
      templateRecord.markModified('standings');
      templateRecord.markModified('rounds');
      await templateRecord.save();
      return { match: foundMatchInRound, standings: templateRecord.standings };
    } catch (error) {
      throw error;
    }
  }
}
