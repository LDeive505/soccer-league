import { RequestHandler } from 'express';
import LeaderboardServices from '../services/leaderboardServices';

export default class LeaderBoardControllers {
  constructor(private leaderboardService: LeaderboardServices) {}

  public getHomeLeaderboards: RequestHandler = async (_req, res) => {
    const teams = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(teams);
  };
}
