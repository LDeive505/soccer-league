import { RequestHandler } from 'express';
import LeaderboardServices from '../services/leaderboardServices';

export default class LeaderBoardControllers {
  constructor(private leaderboardService: LeaderboardServices) {}

  public getHomeLeaderboards: RequestHandler = async (_req, res) => {
    const leaderboard = await this.leaderboardService.getLeaderboard(true);
    return res.status(200).json(leaderboard);
  };

  public getAwayLeaderboards: RequestHandler = async (_req, res) => {
    const leaderboard = await this.leaderboardService.getLeaderboard(false);
    return res.status(200).json(leaderboard);
  };
}
