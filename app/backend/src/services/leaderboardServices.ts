import { QueryTypes } from 'sequelize';
import Match from '../database/models/Match';
import { Leaderboard, dataBoard } from '../types/Leaderboard';
import { leaderboardQuery } from './leaderboardQueries';
import ApiError from '../errors/ApiError';

export default class LeaderboardServices {
  constructor(private matchModel: typeof Match) {}

  public async getLeaderboard(): Promise<Leaderboard> {
    const data = await this.matchModel.sequelize
      ?.query(leaderboardQuery, { type: QueryTypes.SELECT }) as dataBoard[];

    if (!data) throw new ApiError('No data found', 404);

    const leaderboardUnsorted = data.map((team) => {
      const { totalVictories, totalDraws, totalGames } = team;
      const totalPoints = (totalVictories * 3) + totalDraws;
      const effString = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
      const efficiency = Number(effString);
      return { ...team, totalPoints, efficiency };
    });

    const leaderboard = leaderboardUnsorted.sort((a, b) => b.totalPoints - a.totalPoints);

    return leaderboard as Leaderboard;
  }
}
