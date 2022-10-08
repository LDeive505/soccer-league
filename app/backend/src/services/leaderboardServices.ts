import { QueryTypes } from 'sequelize';
import Match from '../database/models/Match';
import { Leaderboard, dataBoard } from '../types/Leaderboard';
import { homeTeamQuery, awayTeamQuery } from '../helpers/leaderboardQueries';
import { mergeLeaderboards, sortLeaderboard } from '../helpers/leaderboardHelpers';
import ApiError from '../errors/ApiError';

export default class LeaderboardServices {
  constructor(private matchModel: typeof Match) {}

  public async getLeaderboard(sqlQuery: string): Promise<Leaderboard> {
    const data = await this.matchModel.sequelize
      ?.query(sqlQuery, { type: QueryTypes.SELECT }) as dataBoard[];

    if (!data) throw new ApiError('No data found', 404);

    const leaderboardUnsorted = data.map((team) => {
      const { totalVictories, totalDraws, totalGames } = team;
      const totalPoints = (totalVictories * 3) + totalDraws;
      const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

      return { ...team, totalPoints, efficiency };
    });

    const leaderboard = leaderboardUnsorted.sort((a, b) => b.totalPoints - a.totalPoints);

    return leaderboard as Leaderboard;
  }

  public async getAllTeamsLeaderboard(): Promise<Leaderboard> {
    const homeLeaderboard = await this.getLeaderboard(homeTeamQuery);
    const awayLeaderboard = await this.getLeaderboard(awayTeamQuery);
    const unsortedLeaderboard = mergeLeaderboards(homeLeaderboard, awayLeaderboard);
    return sortLeaderboard(unsortedLeaderboard);
  }
}
