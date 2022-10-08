import { RequestHandler } from 'express';
import LeaderboardServices from '../services/leaderboardServices';
import { homeTeamQuery, awayTeamQuery } from '../helpers/leaderboardQueries';

export default class LeaderBoardControllers {
  constructor(private leaderboardService: LeaderboardServices) {}

  public getLeaderboard: RequestHandler = async (req, res) => {
    const leaderboard = await this.leaderboardService.getAllTeamsLeaderboard();
    return res.status(200).json(leaderboard);
  };

  public getHomeLeaderboard: RequestHandler = async (_req, res) => {
    const leaderboard = await this.leaderboardService.getLeaderboard(homeTeamQuery);
    return res.status(200).json(leaderboard);
  };

  public getAwayLeaderboard: RequestHandler = async (_req, res) => {
    const leaderboard = await this.leaderboardService.getLeaderboard(awayTeamQuery);
    return res.status(200).json(leaderboard);
  };
}
